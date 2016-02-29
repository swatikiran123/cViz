var Q = require('q');

var constants 				= require('../scripts/constants');

var model 				    = require(constants.paths.models +  '/user')

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

    model
        .findOne({ _id: id })
        .populate('noteBy')
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
                console.log(item);
                deferred.resolve(item);
        });

    return deferred.promise;
} // gentOneById method ends

function create(userParam) {
    var deferred = Q.defer();

    // validation
    usersDb.findOne(
        { handle: userParam.handle },
        function (err, user) {
            if (err) deferred.reject(err);

            if (user) {
                // handle already exists
                deferred.reject('Username "' + userParam.handle + '" is already taken');
            } else {
                createUser();
            }
        });

    function createUser() {
        // set user object to userParam without the cleartext password
        var user = _.omit(userParam, 'password');
        if(userParam.password == null)
            userParam.password = "dummystring";

        // add hashed password to user object
        user.pwdHash = bcrypt.hashSync(userParam.password, 10);

        usersDb.create(
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
                console.log(item);
                deferred.resolve(item);
        });

    return deferred.promise;
} // gentOneById method ends