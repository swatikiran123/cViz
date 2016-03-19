var _ = require("underscore");

var constants	= require('../scripts/constants');
var logger 		= require(constants.paths.scripts + '/logger');
var util 			= require(constants.paths.scripts + '/util');
var secure 			= require(constants.paths.scripts + '/secure');

var menuDef 	= require(constants.paths.views + '/assets/menuDef');

var menuBuilder = {};

menuBuilder.getMenu = getMenu;

module.exports = menuBuilder;

function getMenu(user, type){

	var script = [];

	logger.writeJson(user.memberOf);
	logger.writeLine();
	logger.writeJson(menuDef.items);

	menuDef.items.forEach(function(item){
		if(secure.isInAnyGroups(user, item.roles)){
			logger.writeLine(item.name, '', 1);

			var menu = [];
			menu.push("<li>");
			menu.push(util.formatString("<a href='%s' class='menu-item-side'>", item.link));
			menu.push(util.formatString("<img class='menu-icon-side' src='%s'/>%s</a>", item.icon, item.name));
			menu.push("</li>");

			script.push(menu.join(" "));
		}
	});

	return script.join(" ");
}
