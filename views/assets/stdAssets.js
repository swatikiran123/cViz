module.exports = {

 assets : {
	"bootstrap": {
		"cdn": [
			"//netdna.bootstrapcdn.com/bootstrap/3.0.2/css/bootstrap.css"
		],
		"dev":[
			"/public/libs/bootstrap/dist/css/bootstrap.css",
			"/public/libs/bootstrap/dist/js/bootstrap.js"
		],
		"prod":[
			"/public/libs/bootstrap/dist/css/bootstrap.min.css"
		]
	},

	"font-awesome": {
		"cdn": [
			"//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css"
		],
		"dev":[
			"/public/libs/font-awesome/css/font-awesome.css"
		],
		"prod":[
			"/public/libs/font-awesome/css/font-awesome.min.css"
		]
	},

	"jquery": {
		"cdn": [
		],
		"dev":[
			"/public/libs/jquery/dist/jquery.js",
			"/public/libs/jquery-ui/jquery-ui.js",
			"/public/libs/jquery-ui/themes/smoothness/jquery-ui.css"
		],
		"prod":[
		]
	},

	"jquery-ui": {
		"cdn": [
		],
		"dev":[
			"/public/libs/jquery-ui/jquery-ui.js",
			"/public/libs/jquery-ui/themes/smoothness/jquery-ui.css"
		],
		"prod":[
		]
	},

	"angular-core": {
		"cdn": [
		],
		"dev":[
			"/public/libs/angular/angular.js",
			"/public/libs/angular-route/angular-route.js",
			"/public/libs/angular-cookies/angular-cookies.js"
		],
		"prod":[
		]
	},

// Heavy donot use this, use angular bootstrap instead
	// "angular-ui":{
	// 	"cdn":[],
	// 	"dev":[
	// 		"/public/libs/angular-animate/angular-animate.js",
	// 		"/public/libs/angular-touch/angular-touch.js",
	// 		"/public/libs/angular-ui/build/angular-ui.js",
	// 		"/public/libs/angular-ui/build/angular-ui.css"
	// 	],
	// 	"prod":[]
	// },

	"angular-bootstrap":{
		"cdn":[],
		"dev":[
			"/public/libs/angular-bootstrap/ui-bootstrap-tpls.js"
		],
		"prod":[]
	},

	"angular-animate": {
		"cdn": [
		],
		"dev":[
			"/public/libs/angular-animate/angular-animate.js"
		],
		"prod":[
		]
	},

	"angular-material": {
		"cdn": [
		],
		"dev":[
			"/public/libs/angular-animate/angular-animate.js",
			"/public/libs/angular-aria/angular-aria.js",
			"/public/libs/angular-material/angular-material.js",
			"/public/libs/angular-material/angular-material.css"
		],
		"prod":[
		]
	},

	"angular-text": {
		"cdn": [
		],
		"dev":[
			"/public/assets/w/js/textAngular.js"
		],
		"prod":[
		]
	},

	"angular-growl": {
		"cdn": [
		],
		"dev":[
			"/public/libs/angular-growl-v2/build/angular-growl.css",
			"/public/libs/angular-growl-v2/build/angular-growl.js"
		],
		"prod":[
		]
	}

}

};
