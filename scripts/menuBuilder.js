var _ = require("underscore");

var constants	= require('../scripts/constants');
var logger 		= require(constants.paths.scripts + '/logger');
var util 			= require(constants.paths.scripts + '/util');
var secure 		= require(constants.paths.scripts + '/secure');
var menuDef 	= require(constants.paths.views + '/assets/menuDef');
var routeDef 	= require(constants.paths.views + '/assets/routeDef');

var menuBuilder = {};

menuBuilder.getMenu = getMenu;
menuBuilder.getDefaultPage = getDefaultPage;

module.exports = menuBuilder;

function getMenu(user, type){

	var menu = [];
	menu.push("<div class='sb-menu'>");
	menu.push("<ul>")

	menuDef.items.forEach(function(item){
		if(secure.isInAnyGroups(user, item.roles)){
			menu.push("<li class='sidebar-item'>");
			menu.push(util.formatString("<a  href='%s'>", item.link));
			menu.push(util.formatString("<i class='menu-icon fa %s fonticon'></i>", item.icon));
			menu.push(util.formatString("%s</a>",item.name));
			menu.push("</a></li>");
		} // end of if condition
	}); // end of for each block

	menu.push("</ul>")
	menu.push("</div>");

	return(menu.join("\n"));
} // end of getMenu()

function getDefaultPage(user, type){
	var grps = secure.getGroups(user).split(',');
	var seg = routeDef[type];
	var path = seg[grps[0]];
	return path;
}
