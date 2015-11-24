angular.module('appService', [])

.factory('Transaction', function($http) {

	// create a new object
	var transFactory = {};

	// get all transactions
	transFactory.all = function() {
		return $http.get('/api/midata/');
	};

	// create a transactions
	transFactory.create = function(transData) {
		return $http.post('/api/midata/', transData);
	};

	// delete a transactions
	transFactory.delete = function(id) {
		return $http.delete('/api/midata/' + id);
	};

	// run the R script
	transFactory.run = function() {
		return $http.get('/api/script/');
	};

	// return our entire transFactory object
	return transFactory;

})

.factory('Bank', function($http) {

	// create a new object
	var bankFactory = {};

	// get all banks
	bankFactory.all = function() {
		return $http.get('/api/bank/');
	};

	// create a bank
	bankFactory.create = function(transData) {
		return $http.post('/api/bank/', transData);
	};

	// return our entire transFactory object
	return bankFactory;

});