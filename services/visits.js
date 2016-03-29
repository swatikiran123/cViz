'use strict';

var Q               = require('q');
var _								= require('underscore');
var mongoose = require('mongoose')
, Schema = mongoose.Schema;
var moment 					= require('moment');  require('moment-range');
var constants       = require('../scripts/constants');
var util						= require(constants.paths.scripts + "/util");
var logger						= require(constants.paths.scripts + "/logger");
var secure						= require(constants.paths.scripts + "/secure");
var model           = require(constants.paths.models +  '/visit');
var scheduleModel   = require(constants.paths.models +  '/visitSchedule');

// Service method definition -- Begin
var service = {};

service.getAll = getAll;
service.create = create;

service.getOneById = getOneById;
service.getSessionsById = getSessionsById;
service.updateById = updateById;
service.deleteById = deleteById;

module.exports = service;

// Method implementations
function getAll(thisUser){
	var deferred = Q.defer();

	// by default filter not applicable for "vManager, exec"
	var filter = {};
	var userId = thisUser._id;

	//console.log(userId);
	if( secure.isInAnyGroups(thisUser, "customer")){
		logger.writeLine("Found customer!!!",'' , 2);
				filter = {client : thisUser.orgRef};  // all visits by his company
			}
			else if(secure.isInAnyGroups(thisUser, "exec")){
						logger.writeLine("Found exec!!!",'' , 2);
			}
			else if(secure.isInAnyGroups(thisUser, "vManager")){
						logger.writeLine("Found vManager!!!",'' , 2);
			}
			else if( secure.isInAnyGroups(thisUser, "user")){
				logger.writeLine("Found vManager!!!",'' , 2);
				filter = {
					$or: [
						{createBy: userId},
						{agm: userId}
					]
				};

		}

		// logger.writeLine("Getting Data from service...\nwith filter")
		//
		// logger.writeJson(filter);

		var visitsByTimeline = [];
    model
			.find(filter)
			.sort('startDate')
			.exec(function(err, list){
		      if(err) {
		        logger.writeLine(err, 'error', 0);
		        deferred.reject(err);
			    }
			    else{
						logger.writeLine("Data retrieved :: " + list.length,null,1);
						logger.writeJson(list);

						console.log("data transform to timeline");
						transform(list);

		       	deferred.resolve(visitsByTimeline);
				 	}
			});

			function transform(visits){

				var visitsSorted =  _.sortBy( visits, 'startDate' );

				var today = moment();

				var	thisWeekBeginsOn = moment(today).startOf('isoweek').isoWeekday(0);
				var thisWeekEndsOn = moment(today).endOf('isoweek').isoWeekday(6);

				var lastWeekEndsOn = moment(thisWeekBeginsOn).subtract(1,'days');
				var lastWeekBeginsOn = moment(lastWeekEndsOn).subtract(7,'days');
				var beforelastWeek = moment(lastWeekBeginsOn).subtract(1,'days');

				var nextWeekBeginsOn = moment(thisWeekEndsOn).add(1,'days');
				var nextWeekEndsOn = moment(nextWeekBeginsOn).add(7,'days');
				var afterNextWeek = moment(nextWeekEndsOn).add(1,'days');

				var thisWeek = today.range("week");
				var thisDay = moment.range(today, today);
				var lastWeek = moment.range(lastWeekBeginsOn, lastWeekEndsOn);
				var nextWeek = moment.range(nextWeekBeginsOn, nextWeekEndsOn);
				var past = moment.range(null, lastWeekEndsOn);
				var further = moment.range(afterNextWeek, null)

				console.log("today: " + today.format("ddd D-MMM-YYYY"));
				console.log("this week:" + thisWeekBeginsOn.format("ddd D-MMM-YYYY") + " - " +
					thisWeekEndsOn.format("ddd D-MMM-YYYY") + " >> " + thisWeek.toString());
				console.log("last week:" + lastWeekBeginsOn.format("ddd D-MMM-YYYY") + " - " +
					lastWeekEndsOn.format("ddd D-MMM-YYYY") + " >> " + lastWeek.toString());
				console.log("next week:" + nextWeekBeginsOn.format("ddd D-MMM-YYYY") + " - " +
					nextWeekEndsOn.format("ddd D-MMM-YYYY") + " >> " + nextWeek.toString());
				console.log("past: - " + beforelastWeek.format("ddd D-MMM-YYYY") + " >> " + past.toString());
				console.log("further: "+ afterNextWeek.format("ddd D-MMM-YYYY") + " >> " + further.toString());

				visitsByTimeline.push({
					timeline: "past",
					start: null,
					end: beforelastWeek,
					visits: filterByRange(visitsSorted, past)
				});

				visitsByTimeline.push({
					timeline: "last-week",
					start: lastWeekBeginsOn,
					end: lastWeekEndsOn,
					visits: filterByRange(visitsSorted, lastWeek)
				});

				visitsByTimeline.push({
					timeline: "this-week",
					start: thisWeekBeginsOn,
					end: thisWeekEndsOn,
					visits: filterByRange(visitsSorted, thisWeek)
				});

				visitsByTimeline.push({
					timeline: "today",
					start: today,
					end: today,
					visits: filterByRange(visitsSorted, thisDay)
				});

				visitsByTimeline.push({
					timeline: "next-week",
					start: nextWeekBeginsOn,
					end: nextWeekEndsOn,
					visits: filterByRange(visitsSorted, nextWeek)
				});

				visitsByTimeline.push({
					timeline: "further",
					start: afterNextWeek,
					end: null,
					visits: filterByRange(visitsSorted, further)
				});

			}

			function filterByRange(visits, range){
				return(
					visits.filter(function(x){
						//console.log(range.toString() + " >> " x.startDate.toString())
						return range.contains(x.startDate)
					})
				);
			}

    return deferred.promise;
} // getAll method ends

function getOneById(id){
    var deferred = Q.defer();

    model
    .findOne({ _id: id })
    .populate('agm')
    .populate('anchor')
    .populate('createBy')
    .populate('client')
    //.populate('visitors.visitor')
    .exec(function (err, item) {
        if(err) {
            console.log(err);
            deferred.reject(err);
        }
        else

            deferred.resolve(item);
    });
    return deferred.promise;

} // gentOneById method ends

function getSessionsById(id){
    var deferred = Q.defer();

		var sessionDays = [];

    model
    .findOne({ _id: id })
    .exec(function (err, visit) {
        if(err) {
            console.log(err);
            deferred.reject(err);
        }
        else{
					scheduleModel
						.find({ visit: id })
						.exec(function (err, sessions){
							if(err){
								console.log(err);
								deferred.reject(err);
							}
							else{
								transform(visit, sessions);
								deferred.resolve(sessionDays);
							}
						}); // end of scheduleModel find
					} // end of if else
    }); // end of model find

		// Internal method to transform visit data to session
		function transform(visit, sessions)
		{
			var vistSchedule =  _.sortBy( visit.schedule, 'startDate' );

			// first built list of all days with location from visit data
			var i=1;
			vistSchedule.forEach(function(sch){

				// loop thru each of the days in the schedule
				var dayRange = moment.range(sch.startDate, sch.endDate);
				dayRange.toArray('days').forEach(function(d){

					// filter schedule data for each of the days
					var daySessions = sessions.filter(function(x){
						var thisDay = moment(x.scheduleDate);
						return d.isSame(thisDay, 'day')
					});

					// skip days for which sessions are not scheduled
					if(daySessions.length > 0){
					  var schedule = {
							day : i,
							date : d,
							location: sch.location,
							//count: daySessions.length,
							sessions: daySessions
						}; // end of schedule object

						i++;
					}

					sessionDays.push(schedule);
				}); // end of date range loop
			}); // end of visit vistSchedule loop
		}

    return deferred.promise;
} // getSessionsById method ends

function create(data) {
    var deferred = Q.defer();

    model.create(data, function (err, doc) {
        if (err) {
            console.log("err- " + err);
            deferred.reject(err);
        }
        else
        {
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function updateById(id, data) {
    var deferred = Q.defer();

    model.findByIdAndUpdate(id, data, function (err, doc) {
        if (err) {
            deferred.reject(err);
        }
        else
            deferred.resolve(doc);
    });

    return deferred.promise;
}

function deleteById(id) {
    var deferred = Q.defer();

    model.findByIdAndRemove(id, function (err, doc) {
        if (err) {
            deferred.reject(err);
        }
        else{
            deferred.resolve(doc);
        }
    });

    return deferred.promise;
}
