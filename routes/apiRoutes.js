var express 					= require('express');
var router 						= express.Router();
var constants					= require('../scripts/constants');

var apps 							= require(constants.paths.controllers + '/api/application');
var auth 							= require(constants.paths.controllers + '/api/auth');
var users 						= require(constants.paths.controllers + '/api/users');
var keynotes 					= require(constants.paths.controllers + '/api/keynotes');
var clients 					= require(constants.paths.controllers + '/api/clients');
var csclocations 			= require(constants.paths.controllers + '/api/csclocations');
var visits 						= require(constants.paths.controllers + '/api/visits');
var visitSchedule 		= require(constants.paths.controllers + '/api/visitSchedules');
var feedbackDef 			= require(constants.paths.controllers + '/api/feedbackDefs');
var fileupload						= require(constants.paths.controllers + '/api/fileupload');
var facts 					= require(constants.paths.controllers + '/api/facts');
var lov 					= require(constants.paths.controllers + '/api/lov');

/*
 * Routes that can be accessed by any one
 */
router.post('/api/v1/login', auth.login);
router.get('/api/v1/app/info', apps.info);

/*
 * Routes that can be accessed only by authenticated & authorized users
 */
router.get('/api/v1/secure/admin/users', users.getAll);
router.get('/api/v1/secure/admin/users/:id', users.getOneById);
router.post('/api/v1/secure/admin/users/', users.create);
router.put('/api/v1/secure/admin/users/:id', users.updateById);
router.delete('/api/v1/secure/admin/users/:id', users.deleteById);
router.get('/api/v1/admin/users/:email', users.getByEmail);

router.get('/api/v1/users/:id',users.getOneById);
router.get('/api/v1/users', users.getAll);
router.post('/api/v1/users/', users.create);
router.put('/api/v1/users/:id',users.updateById); 

//Route for file upload
router.post('/api/v1/upload/',fileupload.create);

// List of service routes for KeyNotes
router.get('/api/v1/secure/keynotes', keynotes.getAll);
router.get('/api/v1/secure/keynotes/:id', keynotes.getOneById);
router.post('/api/v1/secure/keynotes', keynotes.create);
router.put('/api/v1/secure/keynotes/:id', keynotes.updateById);
router.delete('/api/v1/secure/keynotes/:id', keynotes.deleteById);

// List of service routes for clients
router.get('/api/v1/secure/clients', clients.getAll);
router.get('/api/v1/secure/clients/:id', clients.getOneById);
router.post('/api/v1/secure/clients', clients.create);
router.put('/api/v1/secure/clients/:id', clients.updateById);
router.delete('/api/v1/secure/clients/:id', clients.deleteById);
router.get('/api/v1/secure/clients/clientName/:name', clients.getOneByName);

// List of service routes for lov
router.get('/api/v1/secure/lov', lov.getAll);
router.get('/api/v1/secure/lov/:name', lov.getOneByName);
router.post('/api/v1/secure/lov', lov.create);
router.put('/api/v1/secure/lov/:name', lov.updateByName);
router.delete('/api/v1/secure/lov/:name', lov.deleteByName);

// List of service routes for facts
router.get('/api/v1/secure/facts', facts.getAll);
router.get('/api/v1/secure/facts/:id', facts.getOneById);
router.post('/api/v1/secure/facts', facts.create);
router.put('/api/v1/secure/facts/:id', facts.updateById);
router.delete('/api/v1/secure/facts/:id', facts.deleteById);

// List of service routes for csclocations
router.get('/api/v1/secure/csclocations', csclocations.getAll);
router.get('/api/v1/secure/csclocations/:id', csclocations.getOneById);
router.post('/api/v1/secure/csclocations', csclocations.create);
router.put('/api/v1/secure/csclocations/:id', csclocations.updateById);
router.delete('/api/v1/secure/csclocations/:id', csclocations.deleteById);

// List of service routes for visits
router.get('/api/v1/secure/visits', visits.getAll);
router.get('/api/v1/secure/visits/:id', visits.getOneById);
router.post('/api/v1/secure/visits', visits.create);
router.put('/api/v1/secure/visits/:id', visits.updateById);
router.delete('/api/v1/secure/visits/:id', visits.deleteById);

// List of service routes for visitSchedules
router.get('/api/v1/secure/visitSchedules', visitSchedule.getAll);
router.get('/api/v1/secure/visitSchedules/:id', visitSchedule.getOneById);
router.get('/api/v1/secure/visitSchedules/visit/:id', visitSchedule.getAllByVisitId);
router.post('/api/v1/secure/visitSchedules', visitSchedule.create);
router.put('/api/v1/secure/visitSchedules/:id', visitSchedule.updateById);
router.delete('/api/v1/secure/visitSchedules/:id', visitSchedule.deleteById);

// List of service routes for feedbackDefs
router.get('/api/v1/secure/feedbackDefs', feedbackDef.getAll);
router.get('/api/v1/secure/feedbackDefs/:id', feedbackDef.getOneById);
router.post('/api/v1/secure/feedbackDefs', feedbackDef.create);
router.put('/api/v1/secure/feedbackDefs/:id', feedbackDef.updateById);
router.delete('/api/v1/secure/feedbackDefs/:id', feedbackDef.deleteById);

module.exports = router;
