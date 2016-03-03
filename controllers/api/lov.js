'use strict';

var constants         = require('../../scripts/constants');
var dataService     = require(constants.paths.services + '/lovs');

var controller = {}

controller.getAll     = getAll;
controller.create     = create;

controller.getOneByName = getOneByName;
controller.updateByName = updateByName;
controller.deleteByName = deleteByName;

module.exports = controller;

function getAll(req,res){
  dataService.getAll()
  .then(function(data){
    if (data){
        res.send(data);
    }else {
        res.sendStatus(404);
    }
})
  .catch(function (err){
    console.log("exception" + err);
    res.status(500).send(err);
});
}

function getOneByName(req,res){
  dataService.getOneByName(req.params.name)
  .then(function(data){
    if (data){
        res.send(data);
    }else {
        res.sendStatus(404).send("Doc dont exists");
    }
})
  .catch(function (err){
    console.log("doc dont exists" + err);
    res.status(500).send(err);
});
}

function create(req, res) {
  dataService.create(req.body)
  .then(function () {
    res.status(200).send("Doc added successfully");
})
  .catch(function (err) {
    console.log("cntrl create: err - " + err);
    res.status(500).send(err);
});
}

function deleteByName(req, res) {
    dataService.deleteByName(req.params.name)
    .then(function () {
        res.status(200).send("Doc deleted successfully");
    })
    .catch(function (err) {
        console.log("controller delete err: " + err);
        res.status(500).send(err);
    });
}

function updateByName(req, res) {
  dataService.updateByName(req.params.name, req.body)
  .then(function () {
    res.status(200).send("Doc updated successfully");
}) 
  .catch(function (err) {
    console.log(err);
    res.status(500).send(err);
});
}
