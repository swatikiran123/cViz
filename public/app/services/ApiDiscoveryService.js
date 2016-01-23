
myApp.service('ApiDiscoveryService', ['$http', '$q', function($http, $q) {

	// ToDo:: Constant, move this to config area
	var discoveryLink = 'http://localhost:3030/public/discovery.json';
	var serviceDiscovery = {};

	this.getEndPoint = function(key){
		console.log('key: ' + key);
		var deferred = $q.defer();

		//ToDo:: Optimize json load by caching it
		//		Do not load on each call
		$http.get(discoveryLink)
			.success(function(data, status, headers, config) {
				console.log(data);
				serviceDiscovery = data;

				console.log("Service log:: " + serviceDiscovery);

				var path = serviceDiscovery.api[key];
				if(path != null){
					endPoint = serviceDiscovery.server.uri + serviceDiscovery.api[key];
					console.log('endpoint gen:: ' + endPoint);
					deferred.resolve(endPoint);
				}
				else
					console.log('api key not found');
					deferred.resolve();
			})
			.error(function(data, status, headers, config) {
				console.log('api discovery error');
     		deferred.reject(status);
			}); // end of http.get
		
		return deferred.promise;
	};
}]);