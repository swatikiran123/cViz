'use strict';

var Q               = require('q');
var _ 							= require('underscore');
var constants       = require('../scripts/constants');
var model           = require(constants.paths.models +  '/visitSessionTemplates')

// Service method definition -- Begin
var service = {};

service.getAll                = getAll;
service.getAllByVisitId       = getAllByVisitId;
service.create                = create;

service.getOneById = getOneById;
service.updateById = updateById;
service.deleteById = deleteById;
service.getWithQuery = getWithQuery;

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
        .populate('session.owner')
        .populate('session.supporter')
        .populate('feedbackTemplate')
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

function getWithQuery(query, fields, maxRecs, sortEx){

    var deferred = Q.defer();
    var visitTemplateArray = [];
    model
    .find(query)
    .populate('session.owner')
    .populate('session.supporter')
    .populate('feedbackTemplate')
    .limit(maxRecs)
    .sort(sortEx)
    .exec(function(err, list){
        if(err) {
            console.log(err);
            deferred.reject(err);
        }
        else
            for(var i=0;i<list.length;i++)
            {        
                var str = query;
                str = str.substring(0, 24);
                var queryString = query.substring(24,query.length);
                if(list[i].visit == str && list[i].sessionTemplateTitle.contains(queryString))
                {
                    visitTemplateArray.push(list[i]);
                }
            }   

            console.log(visitTemplateArray.length);
            deferred.resolve
            ({
                "items": visitTemplateArray
            });
        });
return deferred.promise;
} // getAll method ends
