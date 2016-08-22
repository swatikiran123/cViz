'use strict';

var Q               = require('q');
var _ 							= require('underscore');
var constants       = require('../scripts/constants');
var model           = require(constants.paths.models +  '/visitSchedule')
var util            = require(constants.paths.scripts + "/util");
// Service method definition -- Begin
var service = {};

service.getAll                = getAll;
service.getAllByVisitId       = getAllByVisitId;
service.create                = create;

service.getOneById = getOneById;
service.updateById = updateById;
service.deleteById = deleteById;
service.getSessionParticipantsById = getSessionParticipantsById;

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
           .populate('comments') 
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

function getAllByVisitId(id){
    var deferred = Q.defer();

    model
        .find({ visit: id })
        .sort({scheduleDate: 1, 'session.startTime': 1})
        .exec(function (err, item) {
            if(err) {
                console.log(err);
                deferred.reject(err);
            }
            else
            {
                deferred.resolve(item);
            }
        }); // end of model

    return deferred.promise;
} // getOneByVisitId method ends

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

function getSessionParticipantsById(id) {
    var deferred = Q.defer();
    var emp = [];
    var client = [];

    model
        .findOne({ _id: id })
        .populate('session.owner')
        .populate('session.supporter')
        .populate('invitees')
        .exec(function (err, scheduleData) {
            if(err) {
                console.log(err);
                deferred.reject(err);
            }
            else
                if(scheduleData.session.owner!=null && scheduleData.session.owner.association == 'employee')
                {
                    emp.push(scheduleData.session.owner);
                }

                if(scheduleData.session.supporter!=null && scheduleData.session.supporter.association == 'employee')
                {
                    emp.push(scheduleData.session.supporter);
                }

                for(var i=0;i<scheduleData.invitees.length;i++)
                {
                    if(scheduleData.invitees[i].association=='employee')
                    {
                        emp.push(scheduleData.invitees[i]);
                    }
                }
                deferred.resolve(emp);
        });

    return deferred.promise;
}