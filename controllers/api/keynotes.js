'use strict';

var constants         = require('../../scripts/constants');
var dataService     = require(constants.paths.services + '/keynotes');

var controller = {}

controller.getAll     = getAll;
controller.create     = create;

controller.getOneById = getOneById;
controller.updateById = updateById;
controller.deleteById = deleteById;

module.exports = controller;

function getAll(req,res){
  dataService.getAll()
    .then(function(userList){
        if (userList){
            console.log(userList);
            res.send(userList);
        }else {
            res.sendStatus(404);
        }
    })
    .catch(function (err){
        console.log("exception" + err);
        res.status(500).send(err);
    });
}

function getOneById(req,res){
  dataService.getOneById(req.params.id)
    .then(function(userList){
        if (userList){
            console.log(userList);
            res.send(userList);
        }else {
            res.sendStatus(404);
        }
    })
    .catch(function (err){
        console.log("exception" + err);
        res.status(500).send(err);
    });
}

function create(req, res) {
  console.log('controller creating as ' + JSON.stringify(req.body));
  dataService.create(req.body)
    .then(function () {
        res.sendStatus(200);
    })
    .catch(function (err) {
        console.log(err);
        res.status(500).send(err);
    });
}

function deleteById(req, res) {
  dataService.deleteById(req.params.id)
    .then(function () {
        res.sendStatus(200);
    })
    .catch(function (err) {
        console.log(err);
        res.status(500).send(err);
    });
}

function updateById(req, res) {
  console.log('controller updating id '+req.params.id+" to "+ JSON.stringify(req.body));
  dataService.updateById(req.params.id, req.body)
    .then(function () {
        res.sendStatus(200);
    }) 
    .catch(function (err) {
        console.log(err);
        res.status(500).send(err);
    });
}
