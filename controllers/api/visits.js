'use strict';

var constants         = require('../../scripts/constants');
var dataService     = require(constants.paths.services + '/visits');
var logger     = require(constants.paths.scripts + '/logger');

var controller = {}

controller.getAll     = getAll;
controller.create     = create;

controller.getOneById = getOneById;
controller.updateById = updateById;
controller.deleteById = deleteById;

controller.getWithAction = getWithAction;
controller.getSessionsById = getSessionsById;
controller.getSchedulesById=getSchedulesById;
controller.getExecsById = getExecsById;
controller.getKeynotesById = getKeynotesById;

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

function getOneById(req,res){
  dataService.getOneById(req.params.id)
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

function getWithAction(req, res){
	logger.dump('debug',0, req.params.id, req.params.action);

	switch(req.params.action.toLowerCase())
	{
        case "schedules":
            getSchedulesById(req,res);
            break; 

		case "sessions":
			getSessionsById(req, res);
			break;

		case "my":
			getMyVisits(req, res);
			break;

		case "activevisit":
			console.log("picking active visit");
			getActiveVisit(req, res);
			break;

		case "execs":
			getExecsById(req, res);
			break;

        case "keynotes":
            getKeynotesById(req,res);
            break;

		default:
			res.send("Invalid action");
	}
}

function getMyVisits(req,res){
	console.log("my visits controller");
	var timeline = (req.param('timeline')===undefined)? "all": req.param('timeline');
	var limit = (req.param('limit')==undefined)? 25: req.param('limit');

	logger.dump('debug',0,timeline,limit);
  dataService.getMyVisits(req.user, timeline, limit)
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
function getSessionsById(req,res){
  dataService.getSessionsById(req.params.id)
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

function getSchedulesById(req,res){
  dataService.getSchedulesById(req.params.id)
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

function getActiveVisit(req, res){
	dataService.getMyVisits(req.user,"next-one")
		.then(function(data){
				if (data){
					logger.Json(data);
					res.send(data["next-one"]);
				}else {
						logger.Json("No active visits");
						res.status(404).send("No active visits");
				}
		})
		.catch(function (err){
				console.log("exception" + err);
				res.status(500).send(err);
		});
}

function getExecsById(req,res){
  dataService.getExecsById(req.params.id)
    .then(function(data){
        if (data){
            res.send(data);
        }else {
            res.status(404).send("Executive Bios for the visit not found");
        }
    })
    .catch(function (err){
        console.log("exception" + err);
        res.status(500).send(err);
    });
}

function getKeynotesById(req,res){
    var visitid;
    console.log(req.params.action);
    dataService.getMyVisits(req.user,"next-one")
    .then(function(data){
        if (data){
            console.log(data["next-one"].visits._id);
            if(req.params.id != "current")
                visitid = req.params.id;
            else     
                visitid = data["next-one"].visits._id;           
  
              dataService.getKeynotesById(visitid)
                .then(function(data){
                    if (data){
                        res.send(data);
                    }else {
                        res.status(404).send("Keynotes for the visit not found");
                    }
                })
                .catch(function (err){
                    console.log("exception" + err);
                    res.status(500).send(err);
                });    
        }

        else {
            logger.Json("No active visits");
            res.status(404).send("No active visits");
        }
    })
    .catch(function (err){
        console.log("exception" + err);
        res.status(500).send(err);
    });   
}

function create(req, res) {
  dataService.create(req.body,res)
    .then(function (data) {
        if (data){
            res.send(data);
        }else {
            res.status(404).send("Doc not added");
        }
    })
    .catch(function (err) {
        console.log("cntrl create: err - " + err);
        res.status(500).send(err);
    });
}

function deleteById(req, res) {
  dataService.deleteById(req.params.id)
    .then(function () {
        res.status(200).send("Doc deleted successfully");
    })
    .catch(function (err) {
        console.log("controller delete err: " + err);
        res.status(500).send(err);
    });
}

function updateById(req, res) {
  dataService.updateById(req.params.id, req.body)
    .then(function () {
        res.status(200).send("Doc updated successfully");
    })
    .catch(function (err) {
        console.log(err);
        res.status(500).send(err);
    });
}
