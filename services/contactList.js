'use strict';

var Q               = require('q');
var constants       = require('../scripts/constants');
var model           = require(constants.paths.models +  '/contactList')

// Service method definition -- Begin
var service = {};

service.getAll = getAll;
service.create = create;

service.getOneById = getOneById;
service.updateById = updateById;
service.deleteById = deleteById;
service.getWithCity = getWithCity;

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
    .populate('user')
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

function getWithCity(query){
    var deferred = Q.defer();
    var user = [];

    model
    .find({ location: query.location })
    .populate('user')
    .select('location type user _id')

    .exec(function (err, item) {
        if(err) {
            console.log(err);
            deferred.reject(err);
        }
        else
        { 
            for (var i =0;i< item.length; i++) {
              user.push(transform(item[i].user, item[i].type, item[0].location));
          };
          deferred.resolve(user);
      }
  });
    function transform(type, role, loc)
    {
            var typeData={
                name :(type.name.prefix+" "+type.name.first+" "+type.name.middle+" "+type.name.last+" "+type.name.suffix),
                avatar :type.avatar,
                jobTitle :type.jobTitle,
                summary :type.summary,
                email :type.email,
                contactNo :type.contactNo[0].contactNumber,
                type: role,
                location: loc,
                organization: type.organization,
                firstName: type.name.first,
                lastName: type.name.last,
                middleName: type.name.middle
            }
            return typeData;
        }
        return deferred.promise;
} // getWithCity method ends


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