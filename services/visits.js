'use strict';

var Q               = require('q');
var _								= require('underscore');
var constants       = require('../scripts/constants');
var util						= require(constants.paths.scripts + "/util");
var model           = require(constants.paths.models +  '/visit');
var schedule        = require(constants.paths.models +  '/visitSchedule');

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
function getAll(){
    var deferred = Q.defer();

    model.find(function(err, list){
      if(err) {
        console.log(err);
        deferred.reject(err);
    }
    else
       deferred.resolve(list);
});

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
    .populate('visitors.visitor')
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
					schedule
						.find({ visit: id })
						.exec(function (err, sessions){
							if(err){
								deferred.reject(err);
							}
							else{
								transform(visit, sessions);
								deferred.resolve(sessionDays);
							}
						})
					}
    });

		// Internal method to transform visit data to session
		function transform(visit, sessions)
		{
			var vistSchedule =  _.sortBy( visit.schedule, 'startDate' );

			// first built list of all days with location from visit data
			var i=1;
			vistSchedule.forEach(function(sch){

				for (var d = new Date(util.dateOnly(sch.startDate));
									d <= new Date(util.dateOnly(sch.endDate));
									d.setDate(d.getDate() + 1)) {

					// assign schedule data for each of the days
					var daySessions = _.where(sessions, function(scheduleDate, d){
						return util.dateOnly(scheduleDate) === util.dateOnly(d);
					});

				  schedule = {
						day : i,
						date : util.dateOnly(d),
						location: sch.location,
						sessions: daySessions
					}; // end of schedule object
					i++;

					sessionDays.push(schedule);
				} // end of date range loop
				// console.log(sch.location);
			}); // end of visit vistSchedule loop

			return sessionDays;
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
