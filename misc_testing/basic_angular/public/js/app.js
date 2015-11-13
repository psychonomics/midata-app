angular.module('routerApp', ['routerRoutes', 'ngAnimate'])

// create the controller and inject Angular's 
// this will be the controller for the ENTIRE site
.controller('mainController', function() {

	var vm = this;

    	// create a bigMessage variable to display in our view
    	vm.bigMessage = 'A big message';

})

// home page specific controller
.controller('homeController', function($scope) {

	var vm = this;

	vm.message = 'This is the home page!';
     	
})

// about page controller
.controller('resultsController', function() {

	var vm = this;

    	vm.message = 'Results to appear here...';
})

// contact page controller
// .controller('contactController', function() {

// 	var vm = this;

//     	vm.message = 'Contact us! JK. This is just a demo.';
// });
