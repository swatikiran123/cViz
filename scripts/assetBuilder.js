var constants	= require('../scripts/constants');
var _ = require("underscore");

var stdAssets 	= require(constants.paths.views + '/assets/stdAssets');
var appAssets 	= require(constants.paths.views + '/assets/appAssets');

var stdAssetMap 		= require(constants.paths.views + "/assets/stdAssetMap");
var appAssetMap 		= require(constants.paths.views + "/assets/appAssetMap");

var logger 		= require(constants.paths.scripts + '/logger');
var util 			= require(constants.paths.scripts + '/util');
var config    = require(constants.paths.config + '/config');

var assetBuilder = {};

assetBuilder.getAssets = getAssets;

module.exports = assetBuilder;

function getAssets(type, handles){
	////logger.writeLine("assets by handle " + handle);
	var mode = config.get('assets.mode');
	var assetType = appAssets;
	var assetMap = appAssetMap;

	switch(type){
		case 'stdAssets':
			assetType = stdAssets;
			assetMap = stdAssetMap;
			break;

		case 'appAssets':
			assetType = appAssets;
			assetMap = appAssetMap;

			// cdn is not applicable for app assets, switch to prod
			if("cdn".compare(mode))
				mode = "prod";
			break;
	}


	var script = [];
	_.each(handles.split(','), function(handle){
		//logger.writeJson(util.formatString("%s with handle %s", type, handle),'debug',1);

		assetMap.assetMap[handle].forEach(function(map){

			if(assetType.assets[map] === undefined){
				logger.writeLine(util.formatString("%s is not defined for %s", map, type), 'error', 1);
				logger.writeLine("...skipping", 'error', 1);
				return;
			}

			if(assetType.assets[map][mode] !== undefined){
				assetType.assets[map][mode].forEach(function(path){
					//logger.writeJson(path,'',1);
					var file = path.substring(path.lastIndexOf("/") + 1, path.lastIndexOf("."));
					var ext = path.substring(path.lastIndexOf(".") + 1);
					var scr = "";
						//logger.writeJson(ext,'',2);
						if("css".compare(ext)){
							scr = util.formatString("<link rel='stylesheet' href='%s' />", path);
						}
						else if("js".compare(ext)){
							scr = util.formatString("<script type='text/javascript' src='%s'></script>", path);
						}

						script.push(scr)
				});
			}
		});
	});
	// logger.writeLine("scripts for handle: " + handles, 'debug', 1);
	// logger.writeLine(script, 'debug', 1);
	return script.join(" ");
}
