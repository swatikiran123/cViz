'use strict';

angular.module('cviz-admin', ['users']);

angular.module('cviz-customize',
	['userprofileDirective','userDirective','userdisplayDirective','datePicker','keynotes','facts','feedback']);

angular.module('cviz-manage',
	['userprofileDirective','userDirective','userdisplayDirective','datePicker','dropzone','fileuploadDirective','visits',"clients"]);

angular.module('cviz-profile',
	['userprofileDirective','userDirective','userdisplayDirective','datePicker','dropzone','fileuploadDirective','profile']);
