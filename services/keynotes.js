'use strict';

var Q               = require('q');
var constants       = require('../scripts/constants');
var model           = require(constants.paths.models +  '/keynotes')

// Service method definition -- Begin
var service = {};

service.getAll = getAll;
service.create = create;

service.getOneById = getOneById;
service.updateById = updateById;
service.deleteById = deleteById;

module.exports = service;

// Method implementations
function getAll(){
    var deferred = Q.defer();

	model.find(function(err, list){
        console.log(list);
		if(err) {
            console.log(err);
            deferred.reject(err);
        }
		else
			deferred.resolve(list);
	});

	return deferred.promise;
}

function getOneById(){
    var deferred = Q.defer();

    model.findOne(
        { _id: param.id },
        function (err, item) {
            if(err) {
                console.log(err);
                deferred.reject(err);
            }
            else
                deferred.resolve(item);
        });

    return deferred.promise;
}

function create(data) {
    var deferred = Q.defer();

    // ToDo: implement validation logic here

    model.create(data, function (err, doc) {
        if (err) {
            console.log(err);
            deferred.reject(err);
        }

        deferred.resolve();
    });

    return deferred.promise;
}

function updateById(id, data) {
    var deferred = Q.defer();

    // ToDo: implement validation logic here
console.log('service updating id '+ id+" to "+ JSON.stringify(data));
    model.findByIdAndUpdate(id, data, function (err, doc) {
        if (err) {
            console.log(err);
            deferred.reject(err);
        }

        deferred.resolve();
    });

    return deferred.promise;
}

function deleteById(id, data) {
    var deferred = Q.defer();

    model.findByIdAndRemove(id, data, function (err, doc) {
        if (err) {
            console.log(err);
            deferred.reject(err);
        }

        deferred.resolve();
    });

    return deferred.promise;
}