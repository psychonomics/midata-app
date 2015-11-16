angular.module('resultsService', [])

.factory('Transaction', function($http) {

	// create a new object
	var transFactory = {};

	// get a single user
	transFactory.get = function(id) {
		return $http.get('/api/midata/' + id);
	};

	// get all users
	transFactory.all = function() {
		return $http.get('/api/midata/');
	};

	// create a user
	transFactory.create = function(transData) {
		return $http.post('/api/midata/', transData);
	};

	// update a user
	transFactory.update = function(id, transData) {
		return $http.put('/api/midata/' + id, transData);
	};

	// delete a user
	transFactory.delete = function(id) {
		return $http.delete('/api/midata/' + id);
	};

	// run the R script
	transFactory.run = function() {
		return $http.get('/api/script/');
	};

	// return our entire transFactory object
	return transFactory;

});