'use strict';

var Q               = require('q');
var constants       = require('../scripts/constants');
var model           = require(constants.paths.models +  '/lov')
//var userModel           = require(constants.paths.models +  '/user')

// Service method definition -- Begin
var service = {};

service.getAll = getAll;
service.create = create;

service.getOneByName = getOneByName;
service.updateByName = updateByName;
service.deleteByName = deleteByName;

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

function getOneByName(name){
    var deferred = Q.defer();
    model
    .findOne({ name: name })
    .exec(function (err, item) {
        if(err) {
            console.log(err);
            deferred.reject(err);
        }
        else
            console.log(item);
        deferred.resolve(item);
    });

    return deferred.promise;
} // gentOneByName method ends

function create(data) {
    var deferred = Q.defer();

    //data.noteBy = "56c71b49bf009e7424e61099";
    console.log("Saving lov........");
    console.log(data);
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

function updateByName(name, data) {
    var deferred = Q.defer();

    model.findOneAndUpdate({ name: name }, data, function (err, doc) {
        if (err) {
            deferred.reject(err);
        }
        else
            deferred.resolve(doc);
    });

    return deferred.promise;
}

function deleteByName(name) {
    var deferred = Q.defer();
    model.findOneAndRemove({ name: name }, function (err, doc) {
        if (err) {
            deferred.reject(err);
        }
        else{
            deferred.resolve(doc);
        }
    });

    return deferred.promise;
}