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
var clientModel           = require(constants.paths.models +  '/client');
var userModel           = require(constants.paths.models +  '/user');

// Service method definition -- Begin
var service = {};

service.getAll = getAll;
service.create = create;

service.getOneById = getOneById;
service.getSessionsById = getSessionsById;
service.getSchedulesById = getSchedulesById;
service.updateById = updateById;
service.deleteById = deleteById;

service.getMyVisits = getMyVisits;
service.getKeynotesById = getKeynotesById;
service.getParticipantsById = getParticipantsById;
service.pushSession = pushSession;
service.getLocationsById = getLocationsById;
service.getvalidationById = getvalidationById;

service.getVisitStats = getVisitStats;
service.getLastTimeSessionsById = getLastTimeSessionsById;

module.exports = service;

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

// Method implementations
//ToDo:: Fix Known issues
// 2. Date are not as per UTC, timezone is effecting the date filters
// 3. Custo9mers are not filtered by visit. They can access any visit of the client irrective of being part of it

function getMyVisits(thisUser, timeline, limit){
	logger.dump('test', 0, 'Initiate getMyVisits...', thisUser._id, timeline, limit);
	var deferred = Q.defer();

	// massage params
	if (timeline=="" || timeline===undefined)
		timeline = "all";

	if (limit=="" || limit===undefined)
		limit = 25;

	// by default filter not applicable for "vManager, exec"
	var filter = {};
	var drafts_filter = {};
	var user_filter = {};
	var userId = thisUser._id;
	var userSessions = "";

	logger.dump('test', 1,'getUserSessions...');
	getUserSessions(userId)
	.then(function(data){
		userSessions = data;
		logger.dump('test', 1,"Session wise visits", userSessions.length + " rec(s) found");

		var projected = _(userSessions).chain().flatten().pluck('visit').unique().value();
		logger.Json('test',projected);

		var sessionVisits = arrUnique(projected);
		logger.writeLine('test',0, 'Unique sessionVisits');
		logger.Json('test',sessionVisits);

		logger.dump('test', 1,"Checking user role...")
		if( secure.isInAnyGroups(thisUser, "customer"))	{
			logger.dump('test', 2,"Found customer!!!");
				filter = {client : thisUser.orgRef};  // all visits by his company
			}
			else if(secure.isInAnyGroups(thisUser, "exec")){
				logger.dump('test', 2,"Found exec!!!");
			}
			else if(secure.isInAnyGroups(thisUser, "admin")){

				logger.dump('test', 2,"Found admin!!!");
				//console.log(test._id);
				// filter = {
				// 	_id:
				// 		{ $nin:
				// 			[
				// 				'_id',

				// 				{
				// 					$and:
				// 					[
				// 						{createBy: {$ne: userId}},
				// 						{status: {$regex: /draft/, $options: 'm'}} // like draft
				// 					]
				// 				}
				// 			]
				// 		}


				// 	// 	{$or:
				// 	// 		[
				// 	// 			{agm: userId}
				// 	// 			, {anchor: userId}
				// 	// 			, {secondaryVmanager: userId}
				// 	// 			, {'client.salesExec': userId}
				// 	// 			, {'client.accountGM': userId}
				// 	// 			, {'client.industryExec': userId}
				// 	// 			, {'client.globalDelivery': userId}
				// 	// 			, {'client.cre': userId}
				// 	// 			, {'_id': { $in: sessionVisits }}
				// 	// 			, {'invitees': userId }
				// 	// 		]
				// 	// 	}
				// 	// ]
				// };
				// //console.log(_id);
				// console.log(filter);
			}
			else if( secure.isInAnyGroups(thisUser, "vManager")){
				logger.dump('test', 2, "Found vManager!!!");
				filter = {
					$or: [
					{createBy: userId}
					, {agm: userId}
					, {anchor: userId}
					, {secondaryVmanager: userId}
					, {'cscPersonnel.salesExec': userId}
					, {'cscPersonnel.accountGM': userId}
					, {'cscPersonnel.industryExec': userId}
					, {'cscPersonnel.globalDelivery': userId}
					, {'cscPersonnel.cre': userId}
					, {'_id': { $in: sessionVisits }}
					, {'invitees': userId }
					]
				};
			} // end of secure if
			else if( secure.isInAnyGroups(thisUser, "user")){
				logger.dump('test', 2, "Found user!!!");
				filter = {
					$or: [
					{createBy: userId}
					, {agm: userId}
					, {anchor: userId}
					, {secondaryVmanager: userId}
					, {'cscPersonnel.salesExec': userId}
					, {'cscPersonnel.accountGM': userId}
					, {'cscPersonnel.industryExec': userId}
					, {'cscPersonnel.globalDelivery': userId}
					, {'cscPersonnel.cre': userId}
					, {'_id': { $in: sessionVisits }}
					, {'invitees': userId }
					]
				};
			}


			logger.dump('test', 0, "Find visits with filter");

			logger.dump('test', filter);

			var visitsByTimeline = new Array();
			model
			.find(filter)
			.populate('client')
			.limit(limit)
			.sort('startDate')
			.exec(function(err, list){
				if(err) {
					logger.error(0, 'find visits with filter', filter, err);
					deferred.reject(err);
				}
				else{
					logger.dump('test', 1,"Visits found :: " + list.length);
					transform(list);
					logger.dump('test', 1,'------------------------------');
					logger.dump('test', 1,'Transformed data.....');
					logger.Json('test',visitsByTimeline)
					deferred.resolve(visitsByTimeline);
				}
			}) // end of model exec
			// .catch(function (err) {
			// 	logger.writeLine("Error " + err);
			// 	console.log(err.stack)
			// });

			function transform(visits){

				logger.dump('test', 0,"---------------------");
				logger.dump('test', 0,'Begin data tranformation...');

				var visitsSorted =  _.sortBy( visits, 'startDate' );

				visitsSorted.forEach(function(visit){
					logger.dump('test', 0,'----- transform with visit ------')
					logger.dump('test', 1,visit._id, visit.title, visit.startDate, visit.endDate);

					var involved = [];

					// add visit level participants
					logger.dump('test', 2,'Check Sponsor',visit.anchor, thisUser._id,stringCmp(visit.anchor, thisUser._id));
					if(stringCmp(visit.anchor,thisUser._id)){
						var thisOne = {
							id : visit._id,
							type: "Visit",
							title: "Full Visit participation",
							startTime : DateReplaceTime(visit.startDate, "08:30"),
							endTime : DateReplaceTime(visit.endDate, "18:30"),
							role : "Sponsor"
						};
						involved.push(thisOne);
					}

					logger.dump('test', 2,'Check vManager',visit.agm, thisUser._id,stringCmp(visit.agm, thisUser._id));
					if(stringCmp(visit.agm, thisUser._id)){
						var thisOne = {
							id : visit._id,
							type: "Visit",
							title: "Full Visit participation",
							startTime : DateReplaceTime(visit.startDate, "08:30"),
							endTime : DateReplaceTime(visit.endDate, "18:30"),
							role : "Visit Manager"
						};
						involved.push(thisOne);
					}

					if(visit.invitees !== undefined){
						logger.dump('test', 2,'Check Visit invitees',visit.invitees, thisUser._id, arrContains(visit.invitees, thisUser._id))
						if(arrContains(visit.invitees, thisUser._id)){
							var thisOne = {
								id : visit._id,
								type: "Visit",
								title: "Full Visit participation",
								startTime : DateReplaceTime(visit.startDate, "08:30"),
								endTime : DateReplaceTime(visit.endDate, "18:30"),
								role : "Special Invitee"
							}
							involved.push(thisOne);
						}
					}else {
						logger.dump('test', 2,'visit invitees undefined');
					}

					logger.dump('test', 2,'Checking sessions...');
					userSessions.forEach(function(thisSession){
						logger.dump('test', 3, '--------- visit vs. session -----------');
						logger.dump('test', 3,thisSession._id,visit._id,thisSession.visit,stringCmp(thisSession.visit, visit._id));
						if(stringCmp(thisSession.visit, visit._id)){
							// sesion level participants
							logger.dump('test', 4,'session owner', thisUser._id,thisSession.session.owner, stringCmp(thisUser._id,thisSession.session.owner));
							if(stringCmp(thisUser._id,thisSession.session.owner)){
								var thisOne = {
									id : thisSession._id,
									startTime : thisSession.session.startTime,
									endTime : thisSession.session.endTime,
									type : thisSession.session.type,
									title : thisSession.session.title,
									role : thisSession.session.type == "presentation"? "Speaker" : "Owner"
								}
								involved.push(thisOne);
							}

							logger.dump('test', 4,'session supporter',thisUser._id,thisSession.session.supporter, stringCmp(thisUser._id, thisSession.session.supporter))
							if(stringCmp(thisUser._id,thisSession.session.supporter)){
								var thisOne = {
									id : thisSession._id,
									startTime : thisSession.session.startTime,
									endTime : thisSession.session.endTime,
									type : thisSession.session.type,
									title : thisSession.session.title,
									role : "Supporter"
								}
								involved.push(thisOne);
							}

							logger.dump('test', 4,'session invitees', thisSession.invitees, thisUser._id, arrContains(thisSession.invitees, thisUser._id))
							if(thisSession.invitees !== undefined){
								if(arrContains(thisSession.invitees, thisUser._id)){
									var thisOne = {
										id : thisSession._id,
										startTime : thisSession.session.startTime,
										endTime : thisSession.session.endTime,
										type : thisSession.session.type,
										title : thisSession.session.title,
										role : "Session Invitee"
									}
									involved.push(thisOne);
								}
							}
							else {
								logger.dump('test', 4,'session invitees undefined');
							}
						}
						logger.dump('test', 3,'-------- end of sessions');
					}) // end of visit -> session foreach loop

					logger.dump('test', 3,'-------- end of visit');
					logger.dump('test', 3,'Involvement details....');
					logger.Json('test', involved);
					visit.set('involved', involved,  { strict: false });
					logger.Json('test', visit);
				}) // end of visit loop
logger.dump('test', 3,'-------- end of all visits')

var today = moment().startOf('day');
//console.log(today.format("DD-MM-YYYY"));

var	thisWeekBeginsOn = moment.utc(today).startOf('isoweek').isoWeekday(0);
var thisWeekEndsOn = moment.utc(today).endOf('isoweek').isoWeekday(6);

// var lastWeekEndsOn = moment.utc(thisWeekBeginsOn).subtract(1,'days');
// var lastWeekBeginsOn = moment.utc(lastWeekEndsOn).subtract(7,'days');
// var beforelastWeek = moment.utc(lastWeekBeginsOn).subtract(1,'days');

var nextWeekBeginsOn = moment.utc(thisWeekEndsOn).add(1,'days');
var nextWeekEndsOn = moment.utc(nextWeekBeginsOn).add(7,'days');
//var afterNextWeek = moment.utc(nextWeekEndsOn).add(1,'days');

//var pastBegin = moment.utc(lastWeekBeginsOn).subtract(3,'years');
//var furtherEnd = moment.utc(afterNextWeek).add(1,'years');


var pastEnd = moment.utc(today).subtract(1, 'days');
var pastBegin = moment.utc(pastEnd).subtract(3,'years');

var furtherStart = moment.utc(today).add(1, 'days');
var furtherEnd = moment.utc(furtherStart).add(1,'years');


var thisWeek = today.range("week");


//var thisDay = moment.range(today, today);

var thisDay = getDayRange(today);
// console.log(thisDay.start._d);
// console.log(thisDay.end._d);

var todayRange = moment.range(thisDay.start._d, thisDay.end._d);

var past = moment.range(pastBegin, pastEnd);
var further = moment.range(furtherStart, furtherEnd);
var nextOne = moment.range(thisDay.start._d, nextWeekEndsOn)


// var lastWeek = moment.range(lastWeekBeginsOn, lastWeekEndsOn);
// var nextWeek = moment.range(nextWeekBeginsOn, nextWeekEndsOn);
// var past = moment.range(pastBegin, beforelastWeek);
// var further = moment.range(afterNextWeek, furtherEnd);
// var nextOne = moment.range(thisDay.start._d, nextWeekEndsOn)

console.log("---- Date ranges ----")
console.log("today: " + today.format("ddd D-MMM-YYYY") + " >> " + todayRange.toString());
// console.log("this week:" + thisWeekBeginsOn.format("ddd D-MMM-YYYY") + " - " +
// 	thisWeekEndsOn.format("ddd D-MMM-YYYY") + " >> " + thisWeek.toString());
// console.log("last week:" + lastWeekBeginsOn.format("ddd D-MMM-YYYY") + " - " +
// 	lastWeekEndsOn.format("ddd D-MMM-YYYY") + " >> " + lastWeek.toString());
// console.log("next week:" + nextWeekBeginsOn.format("ddd D-MMM-YYYY") + " - " +
// 	nextWeekEndsOn.format("ddd D-MMM-YYYY") + " >> " + nextWeek.toString());
// console.log("past: " + pastBegin.format("ddd D-MMM-YYYY") + " - " +
// 	beforelastWeek.format("ddd D-MMM-YYYY") + " >> " + past.toString());
// console.log("further: "+ afterNextWeek.format("ddd D-MMM-YYYY") + " - " +
// 	furtherEnd.format("ddd D-MMM-YYYY") + " >> " + further.toString());
// console.log("next one: "+ today.format("ddd D-MMM-YYYY") + " - " +
// 	nextWeekEndsOn.format("ddd D-MMM-YYYY") + " >> " + nextOne.toString());

console.log("past: "+ 
	pastBegin.format("ddd D-MMM-YYYY") + " - " + pastEnd.format("ddd D-MMM-YYYY") + 
	" >> " + past.toString());

console.log("further: "+ 
	furtherStart.format("ddd D-MMM-YYYY") + " - " + furtherEnd.format("ddd D-MMM-YYYY") + 
	" >> " + further.toString());

console.log("next one: "+ 
	today.format("ddd D-MMM-YYYY") + " - " + nextWeekEndsOn.format("ddd D-MMM-YYYY") + 
	" >> " + nextOne.toString());


visitsByTimeline = {
	"past":{
		start: pastBegin,
		end: pastEnd,
		visits: ((timeline.contains('past')||timeline.contains('all'))? filterByRange(visitsSorted, past) : null)
	},

	// "last-week" : {
	// 	start: lastWeekBeginsOn,
	// 	end: lastWeekEndsOn,
	// 	visits: ((timeline.contains("last-week")||timeline.contains('all'))? filterByRange(visitsSorted, lastWeek) : null)
	// },

	// "this-week":{
	// 	start: thisWeekBeginsOn,
	// 	end: thisWeekEndsOn,
	// 	visits: ((timeline.contains("this-week")||timeline.contains('all'))? filterByRange(visitsSorted, thisWeek): null)
	// },

	"today":{
		start: thisDay.start._d,
		end: thisDay.end._d,
		visits: ((timeline.contains("today")||timeline.contains('all'))?filterByRange(visitsSorted, todayRange): null)
	},

	// "next-week":{
	// 	start: nextWeekBeginsOn,
	// 	end: nextWeekEndsOn,
	// 	visits: ((timeline.contains("next-week")||timeline.contains('all'))? filterByRange(visitsSorted, nextWeek): null)
	// },

	"further":{
		start: furtherStart,
		end: furtherEnd,
		visits: ((timeline.contains("further")||timeline.contains('all'))? filterByRange(visitsSorted, further) : null)
	},

	"next-one":{
		start: thisDay.start._d,
		end: nextWeekEndsOn,
		visits: ((timeline.contains("next-one")||timeline.contains('all'))? filterByRange(visitsSorted, nextOne)[0] : null)
	}
}

logger.dump('test', 1,'-------- end of transformation')
}

function filterByRange(visits, range){
	return(
		visits.filter(function(x){
			var visitRange = moment.range(x.startDate, x.endDate);
			return range.overlaps(visitRange);
						//return range.contains(moment(x.startDate))
					})
		);
}
		}) //end of getUserSessions
.catch(function (err) {
	logger.writeLine("Error " + err);
	console.log(err.stack)
});
return deferred.promise;
} // getAll method ends

/// For a given user Returns list of all the visitId by participating sessions
function getUserSessions(userId){
	var filter = {
		$or: [
		{'session.owner': userId}
		, {'session.supporter': userId}
		, {'invitees': userId }
		]
	};

	var deferred = Q.defer();
	scheduleModel
	.find(filter)
	.exec(function(err, list){
		if(err){
			console.log(err);
			deferred.reject(err);
		}
		else {
			deferred.resolve(list);
		}
		}) // end of scheduleModel exec

	return deferred.promise;
} // end of getUserSessions

function getOneById(id){
	var deferred = Q.defer();

	model
	.findOne({ _id: id })
	.populate('agm')
	.populate('anchor')
	.populate('keynote.note')
	.populate('secondaryVmanager')
	.populate('createBy')
	.populate('client')
	.populate('comments')
	.populate('feedbackTmpl')
	.populate('sessionTmpl')
	.populate({path:'cscPersonnel.salesExec'})
	.populate({path:'cscPersonnel.accountGM'})
	.populate({path:'cscPersonnel.industryExec'})
	.populate({path:'cscPersonnel.globalDelivery'})
	.populate({path:'cscPersonnel.cre'})
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

/// Retrieve list of sessions by visit Id
function getSessionsById(id){
	var deferred = Q.defer();

	logger.writeLine('debug',0,"Sessions by visit Id " + id);
	var sessionDays = [];

	model
	.findOne({ _id: id })
	.exec(function (err, visit) {
		if(err) {
			logger.writeLine('error',0,err);
			deferred.reject(err);
		}
		else{
			scheduleModel
			.find({ visit: id })
			.sort('session.startTime')
			.exec(function (err, sessions){
				if(err){
					logger.writeLine('error',0,err);
					deferred.reject(err);
				}
				else{
					transform(visit, sessions);
					logger.Json('test',sessionDays);
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
					// if(daySessions.length > 0){
						var schedule = {
							day : i,
							date : d,
							location: sch.location,
							//count: daySessions.length,
							sessions: daySessions
						}; // end of schedule object

						i++;
					// }

					sessionDays.push(schedule);
				}); // end of date range loop
			}); // end of visit vistSchedule loop
		}

		return deferred.promise;
} // getSessionsById method ends

function getSchedulesById(id){
	var deferred = Q.defer();

	logger.writeLine('debug',0,"Sessions by visit Id " + id);
	var sessionDays = [];

	model
	.findOne({ _id: id })
	.exec(function (err, visit) {
		if(err) {
			logger.writeLine('error',0,err);
			deferred.reject(err);
		}
		else{
			scheduleModel
			.find({ visit: id })
			.exec(function (err, sessions){
				if(err){
					logger.writeLine('error',0,err);
					deferred.reject(err);
				}
				else{
					transform(visit, sessions);
					logger.Json('test',sessionDays);
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
					//weather api to get climate details
					var climate = {};
					var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
					var request = new XMLHttpRequest();
					request.open("GET", "http://api.openweathermap.org/data/2.5/weather?q=" + sch.location + "&units=metric&date="+ d + "&APPID=73136fa514890c15bc4534e7b8a1c0c4", false);
					request.send();
					if(request.responseText !== undefined){
						request = JSON.parse(request.responseText);
						var icon = "/public/assets/m/img/ic/"+ request.weather[0].icon +".png";
						climate = {
							daylike:request.weather[0].main,
							temperature:request.main.temp + "\u00B0C",
							minTemp:request.main.temp_min + "\u00B0C",
							maxTemp:request.main.temp_max + "\u00B0C",
							icon: icon
						}
					}
					// skip days for which sessions are not scheduled
					if(daySessions.length > 0){
						var schedule = {
							day : i,
							date : d,
							location: sch.location,
							climate: climate
						}; // end of schedule object

						i++;
					}

					sessionDays.push(schedule);

				}); // end of date range loop

			}); // end of visit vistSchedule loop
		}
		return deferred.promise;
}  // getSchedulesById method ends

function getKeynotesById(id){

	var deferred = Q.defer();
	var keynotesWelcome = [],keynotesThankyou = [];
	var keynotes= [keynotesWelcome,keynotesThankyou];
	// var keynotes = [];
	model
	.findOne({ _id:id})
	.populate('keynote.note')
	.exec(function (err, item) {
		if(err) {
			console.log(item.keynote.context);
			console.log(err);
			deferred.reject(err);
		}
		else
			//fetching keynotes
			for (var i=0; i<item.keynote.length; i++){
				if(item.keynote[i].context == 'welcome')
				{
				keynotesWelcome.push(transform(item.keynote[i]));
				}

				if(item.keynote[i].context == 'thankyou')
				{
				keynotesThankyou.push(transform(item.keynote[i]));
				}
			}

			keynotesWelcome.sort(sortOn("order"));
			keynotesThankyou.sort(sortOn("order"));
			console.log(keynotes);
			deferred.resolve(keynotes);
	});

	function transform(keynote)
	{
		if (keynote==null) {
			console.log("error in adding");
		}
		else{
			var keynoteData={
				order :keynote.order,
				context :keynote.context,
				title : keynote.note.title,
				noteText :keynote.note.noteText,
				noteBy :keynote.note.noteBy,
				noteBy1 :keynote.note.noteBy1,
				noteBy2 :keynote.note.noteBy2,
				createOn :keynote.note.createOn,
				desc: keynote.note.desc,
				attachment: keynote.note.attachment
			}
			console.log("******************************");
			console.log(keynoteData);
			console.log("******************************");
			return keynoteData;
		}
	}

	function sortOn(property){
		return function(a, b){
			if(a[property] < b[property]){
				return -1;
			}else if(a[property] > b[property]){
				return 1;
			}else{
				return 0;
			}
		}
	}
	return deferred.promise;
}

function getLocationsById(id)
{
	var deferred = Q.defer();
	var locations = [];

	model
	.findOne({ _id: id })
	.exec(function (err, item) {
		console.log(item);
		if(err) {
			console.log(err);
			deferred.reject(err);
		}

		else
		{
			//fetching locations
			for (var i=0; i<item.schedule.length; i++){
				var startDate = moment(item.schedule[i].startDate).format('YYYY-MM-DDTHH:mm:ss.SSSS');
				var endDate = moment(item.schedule[i].endDate).format('YYYY-MM-DDTHH:mm:ss.SSSS');
				var dr    = moment.range(startDate, endDate);
				var daysDiff = dr.diff('days'); // dates diff
				for(var k=0;k<=daysDiff;k++)
				{
					locations.push(item.schedule[i].location);
				}
			}
		}

		deferred.resolve(locations);
	});
	return deferred.promise;
}
	
function create(data) {
	var deferred = Q.defer();

	model.create(data, function (err, doc) {
		if (err) {
			console.log("err- " + err);
			deferred.reject(err);
		}
		else
		{
			deferred.resolve(doc);
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



function getvalidationById(id, data){
	var deferred = Q.defer();
	var errMessgs=[];
	model
	.findByIdAndUpdate(id, data) 
	.populate('keynote.note')
	.populate('feedbackTmpl')
	.populate('sessionTmpl')
	.exec(function (err, item) {
		if(err) {
			console.log(err);
			deferred.reject(err);
		}
		else{	
			if(item.feedbackTmpl === "" || item.feedbackTmpl === undefined || item.feedbackTmpl === null){
				errMessgs.push("Feedback Template needs to be defined.");
			}
			if(item.sessionTmpl === "" || item.sessionTmpl === undefined || item.sessionTmpl === null){
				errMessgs.push("Session Template needs to be defined.");

			}		
			if(item.keynote.length != 0 || item.keynote.length == 0 ){
				var count=0;
				for (var i=0; i<item.keynote.length; i++){
					if(item.keynote[i].context === 'welcome')
					{
						count++;
					}
				}
				if (count == 0) {
					errMessgs.push("There should be Atleast one welcome message in the keynote.");
				}
			}
		}
		getSessionsById(item._id)
		.then(function(schedule){
			if(schedule){
				for(var i=0;i<schedule.length;i++){
					if (schedule[i].sessions <= 0 || schedule[i].sessions == undefined || schedule[i].sessions == null ) {

						errMessgs.push(util.formatString("Session is missing for day %s on date %s. ",schedule[i].day,moment(schedule[i].date).format('DD-MMM-YYYY')));
					}
					deferred.resolve(errMessgs);
				}
			}
		})	
	});			
return deferred.promise;

} // gentOneById method ends

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

function getParticipantsById(id){
	var deferred = Q.defer();

	var emp = [];
	var client = [];

	model
	.findOne({ _id: id })
	.populate('client')
	.exec(function (err, visit) {
		if(err) {
			console.log(err);
			deferred.reject(err);
		}
		else{
			// push all client executives

			if (visit.client!= null){
				if (visit.client.cscPersonnel.salesExec!= null) {
					arrAddItem(emp, visit.client.cscPersonnel.salesExec);
				};
				if (visit.client.cscPersonnel.accountGM!= null) {
					arrAddItem(emp, visit.client.cscPersonnel.accountGM);
				};
				if (visit.client.cscPersonnel.industryExec!= null) {
					arrAddItem(emp, visit.client.cscPersonnel.industryExec);
				}
				if (visit.client.cscPersonnel.globalDelivery!= null) {
					arrAddItem(emp, visit.client.cscPersonnel.globalDelivery);
				}
				if (visit.client.cscPersonnel.cre!= null) {
					arrAddItem(emp, visit.client.cscPersonnel.cre);
				}
			}

			// push all client side visitors
			visit.visitors.forEach(function(v){
				arrAddItem(client, v.visitor);
			})

			// push key visit personnel
			arrAddItem(emp, visit.agm);
			arrAddItem(emp, visit.anchor);
			arrAddItem(emp, visit.secondaryVmanager);
			arrAddArray(emp, visit.invitees);


			// push participants from visit schedules
			scheduleModel
			.find({visit: id})
			.exec(function(err, schedules){
				if(err)
					console.log(err);
				else {
					schedules.forEach(function(sch){
						arrAddItem(emp, sch.session.owner);
						arrAddItem(emp, sch.session.supporter);
						arrAddArray(emp, sch.invitees);
					})
				}
			})
			var uEmp = arrUnique(emp);
			var uClient = arrUnique(client);

			userModel
			.find({'_id': { $in: uEmp }})
			.select('_id name email avatar summary jobTitle organization contactNo association')
			.exec(function(err, empsData){
				if(err)
					console.log(err);

				userModel
				.find({'_id': { $in: uClient }})
				.select('_id name email avatar summary jobTitle organization contactNo association')
				.exec(function(err, clientsData){
					if(err)
						console.log(err);

						// console.log("Client reps ::", uClient);
						// console.log("Emp reps ::", uEmp);
						deferred.resolve({
							"clients": clientsData,
							"employees": empsData
						});

					}) // end of user model for clients
			}) // end of user model for emp
		}
	}); // end of visit model

	return deferred.promise;
}

function getVisitSessionsByDate(visitId, thisDate){
	var deferred = Q.defer();

	var  filter = {
		$and: [
				{'visit': visitId}
		  , {'scheduleDate': thisDate }
		]
	};

	scheduleModel
		.find(filter)
		.sort('session.startTime')
		//.select('_id name email avatar summary jobTitle organization contactNo')
		.exec(function(err, sessions){
			if(err){
				console.log(err);
				deferred.reject(err)
			}
			else {
				deferred.resolve(sessions);
			}
		});
		return deferred.promise;
}

function pushSession(sessionId, time){
	var deferred = Q.defer();

	scheduleModel
		.findOne({'_id': sessionId})
		.exec(function(err, session){
			if(err){
				console.log(err);
				deferred.reject(err);
			}
			else {
				getVisitSessionsByDate(session.visit, session.scheduleDate)
				.then(function(allSessions){

					allSessions.forEach(function(sess){
						if(sess.session.startTime >= session.session.startTime){
							sess.session.startTime = DateAddTime(sess.session.startTime, time);
							sess.session.endTime = DateAddTime(sess.session.endTime, time)
							scheduleModel.findByIdAndUpdate(sess._id, sess, function (err, doc) {
								if (err) {
									console.log("error updating session");
									console.log(err.stack);
								}
							}); // end of schedule Update
						} // end of if

					}); // end of sess forEach
				});
			} // end of if err
			deferred.resolve("Done");
		}); // end of find schedule

	return deferred.promise;
}


function getVisitStats() {
	var deferred = Q.defer();

	var visitStats = [];

	var today = moment().startOf('day');
	console.log(today);

	model.find(
				{$and:
					[
						{"anchor": {$exists: true, $ne: null}},
				
						{$or:
							[
								{$and: 
									[
										{"startDate": {$lte: today, $exists: true, $ne: null}},
										{"endDate": {$gte: today, $exists: true, $ne: null}}
									]
								},
								
								{$and: 
									[
										{"startDate": {$gte: today, $exists: true, $ne: null}},
										{"endDate": {$gte: today, $exists: true, $ne: null}}
									]
								}
							]
						}
					]
				}
			)
		.populate('anchor')
		.populate('client')
		.populate('secondaryVmanager')
		.exec(function(err, list){
		if(err) {
			console.log(err);
			deferred.reject(err);
		}
		else
		{
			// deferred.resolve(list);
			// console.log(list);
			for (var i=0; i<list.length; i++){
				visitStats.push(transformVisitStats(list[i]));
			}
			deferred.resolve(visitStats);
		}
	});
	return deferred.promise;
}

function transformVisitStats(visitStats) {
	if (visitStats==null) {
			console.log("error in adding");
		}

	else {
		if(!(visitStats.secondaryVmanager == null || visitStats.secondaryVmanager == undefined ))
		{
			var visitStatsData = {
				client: visitStats.client,
				visitManager: [visitStats.anchor, visitStats.secondaryVmanager],
				// secVmanager: visitStats.secondaryVmanager,
				startDate: visitStats.startDate,
				endDate: visitStats.endDate,
				locations: visitStats.locations
			}
		}
		else if (visitStats.secondaryVmanager == null || visitStats.secondaryVmanager == undefined)
		{
			var visitStatsData = {
				client: visitStats.client,
				visitManager: [visitStats.anchor],
				startDate: visitStats.startDate,
				endDate: visitStats.endDate,
				locations: visitStats.locations
			}
		}
		console.log("******************************");
		console.log(visitStatsData);
		console.log("******************************");
		return visitStatsData;
	}
}

/// Retrieve list of sessions by visit Id
function getLastTimeSessionsById(id){
	var deferred = Q.defer();

	logger.writeLine('debug',0,"Sessions by visit Id " + id);
	var sessionLastDays = [];

	model
	.findOne({ _id: id })
	.exec(function (err, visit) {
		if(err) {
			logger.writeLine('error',0,err);
			deferred.reject(err);
		}
		else{
			scheduleModel
			.find({ visit: id })
			.sort('session.startTime')
			.exec(function (err, sessions){
				if(err){
					logger.writeLine('error',0,err);
					deferred.reject(err);
				}
				else{
					transform(visit, sessions);
					logger.Json('test',sessionLastDays);
					deferred.resolve(sessionLastDays);
				}
						}); // end of scheduleModel find
					} // end of if else
    }); // end of model find

		// Internal method to transform visit data to session
		function transform(visit, sessions)
		{ 		
			sessionLastDays.push(sessions[sessions.length - 1]);
		}

		return deferred.promise;
} // getSessionsById method ends