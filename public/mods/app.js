'use strict';

angular.module('cviz-admin', ['users','confirmDialogDirective','tooltips']);

angular.module('cviz-customize',
	['userprofileDirective','userDirective','userdisplayDirective',
	'appFilters',
	'datePicker',
	'keynotes','facts','feedback','teasers','lovs', 'confirmDialogDirective','contactList','richTextDirective','ngRateIt','feedbackDirective','dropzone','meetingPlaces', 'tooltips','angucomplete','userAutoDirective','angucomplete-alt']);

angular.module('cviz-manage',
	['userprofileDirective','userDirective','userdisplayDirective', 'clientDisplayDirective', 'inviteesDirective',
	'appFilters',
	'datePicker','fileuploadDirective',
	'visits',"clients",'confirmDialogDirective','richTextDirective','ngRateIt','tooltips','dropzone','angucomplete','userAutoDirective','angucomplete-alt']);

angular.module('cviz-profile',
	['userprofileDirective','userDirective','userdisplayDirective',
	'appFilters',
	'datePicker','dropzone','fileuploadDirective',
	'profile','userAutoDirective']);
