'use strict';

angular.module('cviz-admin', ['users','confirmDialogDirective']);

angular.module('cviz-customize',
	['userprofileDirective','userDirective','userdisplayDirective','datePicker','keynotes','facts','feedback','confirmDialogDirective','contactList']);

angular.module('cviz-manage',
	['userprofileDirective','userDirective','userdisplayDirective','datePicker','dropzone','fileuploadDirective','visits',"clients",'confirmDialogDirective']);

angular.module('cviz-profile',
	['userprofileDirective','userDirective','userdisplayDirective','datePicker','dropzone','fileuploadDirective','profile']);
