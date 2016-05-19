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
service.getAllUsers = getAllUsers;
service.getByEmail = getByEmail;
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
        // .populate('memberOf')
        .exec(function (err, item) {
            if(err) {
                console.log(err);
                deferred.reject(err);
            }
            else{
              //console.log(item);
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

function getAllUsers(data){

    var deferred = Q.defer();
    var usersArray = [];
    model
    .find(data)
    .exec(function(err, list){
        if(err) {
            console.log(err);
            deferred.reject(err);
        }
        else
            for(var i=0;i<list.length;i++)
            {        
                // deferred.resolve(list);
                if(list[i].association=='employee')
                {
                usersArray.push(transform(list[i]));
                }
            }   

            deferred.resolve
            ({
                "items": usersArray
            });
    });

    function transform(user)
    {
        if (user==null) {
            console.log("error in adding");
        }
        else{
            var userData={
                userid : user._id,
                firstName :user.name.first,
                lastName :user.name.last,
                email : user.email,
                avatar :user.avatar,
                association :user.association
            }
            console.log("******************************");
            console.log(userData);
            console.log("******************************");
            return userData;
        }
    }
    return deferred.promise;
} // getAll method ends


function getWithQuery(query, fields, maxRecs, sortEx){
    var deferred = Q.defer();
    var usersArray = [];
    var usersArray1 = [];
    
    model
    .find(query)
    .limit(maxRecs)
    .select(fields)
    .sort(sortEx)
    .exec(function (err, item) {
        if(err) {
            console.log(err);
            deferred.reject(err);
        }
        else
            for(var i=0;i<item.length;i++)
            {        
                // deferred.resolve(list);
                if(item[i].association=='employee')
                {
                usersArray.push(transform(item[i]));
                }

                if(item[i].association == 'customer' || item[i].association=='employee')
                {
                    usersArray1.push(transform(item[i]));
                }    
            }   

            deferred.resolve
            ({
                "items": usersArray,
                "items1":usersArray1
            });
    });

    function transform(user)
    {
        if (user==null) {
            console.log("error in adding");
        }
        else{
            var userData={
                userid : user._id,
                firstName :user.name.first,
                lastName :user.name.last,
                email : user.email,
                avatar :user.avatar,
                association :user.association
            }
            // console.log("******************************");
            // console.log(userData);
            // console.log("******************************");
            return userData;
        }
    }
    return deferred.promise;
} // getWithQuery method ends