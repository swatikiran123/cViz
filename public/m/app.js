'use strict';

angular.module('mviz-main', [
'appFilters', 'home','locator','header','scroll','userViewDirective'
]);

angular.module('mviz-visits', [
	'appFilters','visits','sessions','contacts','header','scroll','feedbackDirective','userViewDirective','execBios','clientInfo', 'overallFeedback','ngRateIt'
]);

angular.module('mviz-facts', [
	'ngMap','ui.bootstrap',
	'appFilters',
	'facts','lctnGalry','header','scroll'
]);

angular.module('mviz-add', ['visitAdd','home','scroll']);

angular.module('mviz-emp', []);
