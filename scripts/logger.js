var colors				= require('colors');

var constants       = require('../scripts/constants');
var util						= require(constants.paths.scripts + "/util");

var logger = {};

logger.write = write;
logger.writeLine = writeLine;
logger.Json = Json;
logger.writeJson = Json;
logger.dump = dump;
logger.test = test;

module.exports = logger;

Object.defineProperty(global, '__stack', {
	get: function() {
        var orig = Error.prepareStackTrace;
        Error.prepareStackTrace = function(_, stack) {
            return stack;
        };
        var err = new Error;
        Error.captureStackTrace(err, arguments.callee);
        var stack = err.stack;
        Error.prepareStackTrace = orig;
        return stack;
    }
});

Object.defineProperty(global, '__line', {
	get: function() {
        return __stack[2].getLineNumber();
    }
});

Object.defineProperty(global, '__function', {
	get: function() {
        return __stack[2].getFunctionName();
    }
});

Object.defineProperty(global, '__file', {
	get: function() {
        return __stack[2].getFileName();
    }
});

function write(mode, n, str){
	writeLine(mode,n, str);
}

function Json(mode, obj){
	var str = JSON.stringify(obj,null,2);
	writeLine(mode,0,str);
}

function test(n, args){
	dump('test', n, args);
}

function dump(mode, n, args)
{
	var str = [];
	for (var i = 2; i < arguments.length; i++) {
		if(arguments[i] === undefined)
			str.push("undefined");
		else
			str.push(arguments[i]);
	}

	writeLine(mode,n,str.join(' | '));
}

function writeLine(mode, n, str){

	if(mode !== undefined)
		if("error".compare(mode))
			console.log(util.formatString(">>> call at [%s:%s] of %s", __function, __line, __file));

	if(str === undefined){
		console.log();
		return;
	}

	if(n>0)
		console.log(colors.green("  ".repeat(n) + str));
	else {
		console.log(colors.green(str));
	}
}
