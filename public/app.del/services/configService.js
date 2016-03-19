myApp.provider('envConfigProvider', function() {

	var discoveryLink = 'http://localhost:3030/public/discovery.json';

	var serviceDiscovery = {};

/*	this.getEndPoint = ['$http', function($http){

		$http.get(discoveryLink).success(function(data) {
			console.log(data);
			serviceDiscovery = data;
		});

		console.log("Service log:: " + serviceDiscovery);

		var endPoint = serviceDiscovery.service.ip + ":" + serviceDiscovery.service.port;

		console.log("end point" + endPoint + serviceDiscovery.api['login']);

		return endPoint;
	}];*/
 
	var loadConfig = ['$http', function($http) {
		$http.get(discoveryLink).success(function(data) {
			console.log(data);
			serviceDiscovery = data;
		});

		console.log("Service log:: " + serviceDiscovery);

		return serviceDiscovery;
	}];

	this.$get = loadConfig;
	//this.getEndPoint = loadConfig;

});