module.exports = {

 assets : {
	"app-css": {
		"dev":[
			"/public/assets/w/styles/layout.css",
			"/public/assets/w/styles/pagestyles.css",
			"/public/assets/w/styles/materialform.css",
			"/public/assets/w/styles/dataview-table.css",
			"/public/assets/w/styles/dataview-panels.css",
			"/public/assets/w/styles/userpicker.css"
		],
		"prod":[
			"/public/assets/w/styles/layout.min.css",
			"/public/assets/w/styles/pagestyles.min.css",
			"/public/assets/w/styles/materialform.min.css",
			"/public/assets/w/styles/dataview-table.min.css",
			"/public/assets/w/styles/dataview-panels.min.css",
			"/public/assets/w/styles/userpicker.min.css"
		]
	},

	"utils":{
		"dev":[
			"/public/assets/g/js/utils.js"
		],
		"prod":[
			"/public/assets/g/js/utils.js"
		]
	}
}

};
