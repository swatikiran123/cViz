'use strict';

angular.module('mviz-main', [
	'appFilters',
	'home','locator','execBios','header','scroll',"clientInfo"
]);

angular.module('mviz-visits', [
	'ui.bootstrap',
	'appFilters', 'userdisplayDirective',
	'visits','sessions','contacts','userdisplayDirective','header','scroll','feedbackDirective'
]);

angular.module('mviz-facts', [
	'ui.bootstrap',
	'appFilters',
	'facts','lctnGalry','header','scroll'
]);

angular.module('mviz-emp', []);
