'use strict';

var constants         = require('../../scripts/constants');

var controller = {}

controller.create = create;

module.exports = controller;

function create(req, res){
	  res.send(req.files);  
}