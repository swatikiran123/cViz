var Q = require('q');
var _ = require('underscore');
var bcrypt = require('bcryptjs');
var path              = require('path');

var constants 				= require('../scripts/constants');

var model 				    = require(constants.paths.models +  '/user')
var config            = require(path.join(constants.paths.config, '/config'));

// Service method definition -- Begin
var service = {};

service.getAll = getAll;
service.create = create;

service.getOneById = getOneById;
service.updateById = updateById;
service.deleteById = deleteById;

service.getByEmail = getByEmail;

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
console.log("Find " + id);
    model
        .findOne({ _id: id })
        .exec(function (err, item) {
            if(err) {
                console.log(err);
                deferred.reject(err);
            }
            else{
              console.log(item);
              deferred.resolve(item);
            }
        });

    return deferred.promise;
} // gentOneById method ends

function create(userParam) {
    var deferred = Q.defer();

    // validation
    model.findOne(
        { email: userParam.email },

        function (err, user) {
            if (err) deferred.reject(err);

            if (user) {
                // handle already exists
                deferred.reject('Email id {"' + userParam.handle + '"} is already taken');
            } else {
                createUser();
            }
        });

    function createUser() {
      if(typeof userParam.local == "undefined")
        userParam.local = {};

      // set user object to userParam without the cleartext password
      var user = _.omit(userParam, 'password');

      if(userParam.local.email == null)
        userParam.local.email = userParam.email;

      if(userParam.local.password == null)
          userParam.local.password = config.get('profile.default-pwd');

        // add hashed password to user object
        user.local.password = bcrypt.hashSync(userParam.local.password, bcrypt.genSaltSync(8), null);

        model.create(
            user,
            function (err, doc) {
                if (err) {
                    console.log(err);
                    deferred.reject(err);
                }

                deferred.resolve();
            });
    }

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

function getByEmail(email){
    var deferred = Q.defer();

    model
        .findOne({ email: email })
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
