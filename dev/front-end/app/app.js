angular.module('routerApp', ['routerRoutes', 'ngAnimate', 'homeCtrl', 'resultsCtrl', 'resultsService'])

// create the controller and inject Angular's 
// this will be the controller for the ENTIRE site
.controller('mainController', function() {

	var vm = this;

    // create a bigMessage variable to display in our view
    vm.bigMessage = 'A big message';

});

// // home page specific controller
// .controller('homeController', ['$scope', function($scope) {

// 	var vm = this;

// 	vm.message = 'Upload your miData file below:';

// 	$scope.csv = {
//     	content: null,
//     	header: true,
//     	headerVisible: true,
//     	separator: ',',
//     	separatorVisible: true,
//     	result: null,
//     	encoding: 'ISO-8859-1',
//     	encodingVisible: true,
//     };
// }])

// // about page controller
// .controller('resultsController', function(User) {

// 	var vm = this;

//     vm.message = 'Results will appear here...';

//     // set a processing variable to show loading things
//     vm.processing = true;

//     // grab all the users at page load
//     User.all()
//         .success(function(data) {

//             // when all the users come back, remove the processing variable
//             vm.processing = false;

//             // bind the users that come back to vm.users
//             vm.users = data;
//         });
// })

// contact page controller
//.controller('contactController', function() {
//
//	var vm = this;
//
//    	vm.message = 'Contact us! JK. This is just a demo.';
//});
