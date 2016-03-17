var constants	= require('../scripts/constants');

var stdAssets 	= require(constants.paths.views + '/assets/stdAssets');
var appAssets 	= require(constants.paths.views + '/assets/appAssets');

var stdAssetMap 		= require(constants.paths.views + "/assets/stdAssetMap");
var appAssetMap 		= require(constants.paths.views + "/assets/appAssetMap");

var logger 		= require(constants.paths.scripts + '/logger');
var util 			= require(constants.paths.scripts + '/util');

var assetBuilder = {};

assetBuilder.getAssets = getAssets;

module.exports = assetBuilder;

function getAssets(type, handles, mode){
	////logger.writeLine("assets by handle " + handle);

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
			break;
	}

//console.log(assetType);
	var script = [];
	handles.split(',').forEach(function(handle){
		assetMap.assetMap[handle].forEach(function(map){
			//logger.writeJson(assetType.assets[map],'',1);

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
				})
			}
		});
	});
	//console.log(script);
	return script;
}
