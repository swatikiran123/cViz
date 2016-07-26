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
controller.getvalidationById = getvalidationById;
controller.getVisitStats = getVisitStats;
// controller.getSessionsById = getSessionsById;
// controller.getSchedulesById=getSchedulesById;
// controller.getExecsById = getExecsById;
// controller.getKeynotesById = getKeynotesById;
// controller.pushSession = pushSession;

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

        case "overallfeedbackexecs":
            getParticipantsFeedback(req,res);
            break;

        case "keynotes":
            getKeynotesById(req,res);
            break;

		case "pushsession":
			pushSession(req,res);
			break;

        case "getlocations":
            getLocationsById(req,res);
            break;

        case "getlasttimesessions":
            getLastTimeSessionsById(req,res);
            break;

        case "getallsessions": 
            getAllSessionsById(req,res);
            break;

        case "getofferingsheads":
            getOfferingsHeadsById(req,res);
            break;

        case "getregionsheads":
            getRegionsHeadsById(req,res);
            break;

		default:
			res.send("Invalid action");
	}
}

function getOfferingsHeadsById(req, res) {
    dataService.getOfferingsHeads(req.params.id)
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


function getRegionsHeadsById(req, res) {
    dataService.getRegionsHeads(req.params.id)
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



function getMyVisits(req,res){
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
  dataService.getParticipantsById(req.params.id)
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


function getParticipantsFeedback(req,res){
  dataService.getParticipantsForOverAllFeedback(req.params.id)
    .then(function(data){
        if (data){
            res.send(data);
        }else {
            res.status(404).send("Users for the visit overall feedback not found");
        }
    })
    .catch(function (err){
        console.log("exception" + err);
        res.status(500).send(err);
    });
}

function getKeynotesById(req,res){
    var visitid;

    dataService.getMyVisits(req.user,"next-one")
    .then(function(data){
        if (data){

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

function pushSession(req,res){
	var visitId = req.params.id;
	var sessionId = req.param('sessionId');
	var time = req.param('time');
    var sesnstatus = req.param('sesnstatus');

  dataService.pushSession(sessionId, time, sesnstatus)
    .then(function(data){
        res.status(200).send("Session moved successfully");
    })
    .catch(function (err){
        console.log("exception" + err);
        res.status(500).send(err);
    });
}

function getLocationsById(req,res){
  dataService.getLocationsById(req.params.id)
    .then(function(data){
        if (data){
            res.send(data);
        }else {
            res.status(404).send("Location for the visit not found");
        }
    })
    .catch(function (err){
        console.log("exception" + err);
        res.status(500).send(err);
    });
}


function getVisitStats(req,res){
  dataService.getVisitStats()
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

function getLastTimeSessionsById(req,res){
  dataService.getLastTimeSessionsById(req.params.id)
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

function getAllSessionsById(req,res){
  dataService.getAllSessionsById(req.params.id)
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

function getvalidationById(req,res){
  dataService.getvalidationById(req.params.id, req.body)
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