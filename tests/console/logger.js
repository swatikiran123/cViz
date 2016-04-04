var constants       = require('../../scripts/constants');
var logger						= require(constants.paths.scripts + "/logger");

console.log("Testing logger functionality");
console.log();

console.log('testing dump');
logger.dump('test',0, 'a','b','c','d');

console.log('testing test');
logger.test(0, 'a','b','c','d');
