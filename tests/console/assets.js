
var constants					= require('../../scripts/constants');
var logger = require(constants.paths.scripts + '/logger');
var util = require(constants.paths.scripts + '/util');
var assetBuilder = require(constants.paths.scripts + '/assetBuilder');

logger.writeLine("Bring assets for general...")
logger.writeLine("... for std",'',1);
logger.writeLine(assetBuilder.getAssets("stdAssets", "general,index", "dev"),'',2);
logger.writeLine("... for app",'',1);
logger.writeLine(assetBuilder.getAssets("appAssets", "general", "dev"),'',2);


// function getAssets(handle){
// 	logger.writeLine("assets by handle " + handle);
// 	// console.log(assetMap.assetMap);
// 	//  console.log(assetMap.assetMap[handle]);
// var script = [];
// 	assetMap.assetMap[handle].forEach(function(map){
// 		assets.assets[map]["dev"].forEach(function(path){
// 			logger.writeJson(path,'',1);
// 			var file = path.substring(path.lastIndexOf("/") + 1, path.lastIndexOf("."));
// 			var ext = path.substring(path.lastIndexOf(".") + 1);
// 			var scr = "";
//   			logger.writeJson(ext,'',2);
// 				if("css".compare(ext)){
// 					scr = util.formatString("<link rel='stylesheet' href='%s' />", path);
// 				}
// 				else if("js".compare(ext)){
// 					scr = util.formatString("<script type='text/javascript' src='%s'></script>", path);
// 				}
//
// 					script.push(scr)
//
//
// 		})
//
// 	});
//
// console.log(script);
// 	return script;
// }
