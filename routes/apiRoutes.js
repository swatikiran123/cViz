var express 					= require('express');
var router 						= express.Router();

var constants					= require('../scripts/constants');

console.log("@apiRouter >> " + constants.paths.controllers);
console.log("@apiRouter >> " + constants.paths.routes);


var apps 							= require(constants.paths.controllers + '/api/application');
var auth 							= require(constants.paths.controllers + '/api/auth');
var users 						= require(constants.paths.controllers + '/api/users');
 
/*
 * Routes that can be accessed by any one
 */
router.post('/api/v1/login', auth.login);
router.get('/api/v1/me', users.getAll);
router.get('/api/v1/secure/app/info', apps.info);

 
/*
 * Routes that can be accessed only by autheticated users
 */
/*router.get('/api/v1/products', products.getAll);
router.get('/api/v1/product/:id', products.getOne);
router.post('/api/v1/product/', products.create);
router.put('/api/v1/product/:id', products.update);
router.delete('/api/v1/product/:id', products.delete);*/
 
/*
 * Routes that can be accessed only by authenticated & authorized users
 */
router.get('/api/v1/secure/admin/users', users.getAll);
router.get('/api/v1/secure/admin/users/:id', users.getOne);
router.post('/api/v1/secure/admin/users/', users.create);
router.put('/api/v1/secure/admin/users/:id', users.update);
router.delete('/api/v1/secure/admin/users/:id', users.delete);
 
module.exports = router;