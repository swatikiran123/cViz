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
	'facts','header','scroll'
]);

angular.module('mviz-add', ['visitAdd','home','scroll','mgo-angular-wizard']);

angular.module('mviz-emp', []);
