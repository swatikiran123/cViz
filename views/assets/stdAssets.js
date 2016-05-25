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
		
		"angular-calendar": {
			"cdn": [
			],
			"dev":[
			"/public/libs/fullcalendar/dist/fullcalendar.css",
			"/public/libs/fullcalendar/dist/fullcalendar.js",
			"/public/libs/fullcalendar/dist/gcal.js"
			],
			"prod":[
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

	"angular-forms":{
		"cdn":[],
		"dev":[
		"/public/libs/angular-messages/angular-messages.min.js"
		],
		"prod":[]
	},

	"angular-bootstrap":{
		"cdn":[],
		"dev":[
		"/public/libs/angular-bootstrap/ui-bootstrap-tpls.js"
		],
		"prod":[]
	},

	"angular-map":{
		"cdn":[],
		"dev":[
		"/public/assets/js/ng-map.min.js"
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
	},

	"angular-fileupload":{
		"cdn":[],
		"dev":[
		"/public/libs/ng-file-upload/ng-file-upload.js",
		"/public/libs/ng-file-upload/ng-file-upload-shim.js"
		],
	},

	"angular-image":{
		"cdn":[],
		"dev":[
		"/public/libs/ngImgCropFullExtended/compile/minified/ng-img-crop.js",
		"/public/libs/ngImgCropFullExtended/compile/minified/ng-img-crop.css"
		],
	},

	"angular-dialog":{
		"cdn":[],
		"dev":[
		"/public/assets/styles/ngDialog-theme-default.css",
		"/public/assets/styles/ngDialog.css",
		"/public/assets/js/ngDialog.min.js"
		],
	},

	"angular-dropzone":{
		"cdn":[],
		"dev":[
		"/public/assets/g/css/dropzone.css",
		"/public/assets/g/js/dropzone.js"
		],
	},

	"angular-confirmDialog":{
		"cdn":[],
		"dev":[
		"/public/assets/g/css/confirmDialog.css"
		],
	},

	"angular-wizard":{
		"cdn":[],
		"dev":[
		"/public/libs/angular-wizard/dist/angular-wizard.js",
		"/public/libs/angular-wizard/dist/angular-wizard.css"
		],
	},

	"angularMultipleSelect":{
		"cdn":[],
		"dev":[
		"/public/libs/angularMultipleSelect/build/multiple-select.min.js",
		"/public/libs/angularMultipleSelect/build/multiple-select.min.css"
		],
	},


	"utils":{
		"cdn":[],
		"dev":[
		"/public/libs/moment/moment.js",
		"/public/libs/moment-range/dist/moment-range.js"
		],
	}

}

};
