'use strict';

var Q               = require('q');
var _ 							= require('underscore');
var constants       = require('../scripts/constants');
var model           = require(constants.paths.models +  '/visitSchedule')

// Service method definition -- Begin
var service = {};

service.getAll                = getAll;
service.getAllByVisitId       = getAllByVisitId;
service.create                = create;

service.getOneById = getOneById;
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
        .populate('visit')
        .populate('client')
        .populate('session.owner')
        .populate('session.supporter')
        .populate('invitees')
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
