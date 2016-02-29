var express 					= require('express');
var router 						= express.Router();

var constants					= require('../scripts/constants');

console.log("@apiRouter >> " + constants.paths.controllers);
console.log("@apiRouter >> " + constants.paths.routes);


var apps 							= require(constants.paths.controllers + '/api/application');
var auth 							= require(constants.paths.controllers + '/api/auth');
var users 						= require(constants.paths.controllers + '/api/users');
var keynotes 					= require(constants.paths.controllers + '/api/keynotes');
var clients 					= require(constants.paths.controllers + '/api/clients');
var csclocations 					= require(constants.paths.controllers + '/api/csclocations');
var facts 					= require(constants.paths.controllers + '/api/facts');
 
/*
 * Routes that can be accessed by any one
 */
router.post('/api/v1/login', auth.login);
router.get('/api/v1/me', users.getAll);
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

// List of service routes for KeyNotes
router.get('/api/v1/keynotes', keynotes.getAll);
router.get('/api/v1/keynotes/:id', keynotes.getOneById);
router.post('/api/v1/keynotes', keynotes.create);
router.put('/api/v1/keynotes/:id', keynotes.updateById);
router.delete('/api/v1/keynotes/:id', keynotes.deleteById);

// List of service routes for clients
router.get('/api/v1/clients', clients.getAll);
router.get('/api/v1/clients/:id', clients.getOneById);
router.post('/api/v1/clients', clients.create);
router.put('/api/v1/clients/:id', clients.updateById);
router.delete('/api/v1/clients/:id', clients.deleteById);


// List of service routes for facts
router.get('/api/v1/facts', facts.getAll);
router.get('/api/v1/facts/:id', facts.getOneById);
router.post('/api/v1/facts', facts.create);
router.put('/api/v1/facts/:id', facts.updateById);
router.delete('/api/v1/facts/:id', facts.deleteById);


// List of service routes for csclocations
router.get('/api/v1/csclocations', csclocations.getAll);
router.get('/api/v1/csclocations/:id', csclocations.getOneById);
router.post('/api/v1/csclocations', csclocations.create);
router.put('/api/v1/csclocations/:id', csclocations.updateById);
router.delete('/api/v1/csclocations/:id', csclocations.deleteById);
 
module.exports = router;