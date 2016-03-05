'use strict';

var Q               = require('q');
var constants       = require('../scripts/constants');
var model           = require(constants.paths.models +  '/client')
//var userModel           = require(constants.paths.models +  '/user')

// Service method definition -- Begin
var service = {};

service.getAll = getAll;
service.create = create;

service.getOneById = getOneById;
service.updateById = updateById;
service.deleteById = deleteById;
service.getOneByName = getOneByName;

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
        .populate({path:'cscPersonnel.salesExec'})
        .populate({path:'cscPersonnel.accountGM'})
        .populate({path:'cscPersonnel.industryExec'})
        .populate({path:'cscPersonnel.globalDelivery'})
        .populate({path:'cscPersonnel.cre'})
        //.populate('client') 
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
} // gentOneById method ends

function getOneByName(name){
    var deferred = Q.defer();
    model
    .findOne({ name: new RegExp(name, 'i')})
    .select('name -_id')
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

    console.log("Saving an Account........");
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