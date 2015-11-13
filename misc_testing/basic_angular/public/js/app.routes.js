// inject ngRoute for all our routing needs
angular.module('routerRoutes', ['ngRoute'])

// configure our routes
.config(function($routeProvider, $locationProvider) {
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl : 'views/pages/home.html',
            controller  : 'homeController',
            controllerAs: 'home'
        })

        // route for the about page
        .when('/results', {
            templateUrl : 'views/pages/results.html',
            controller  : 'resultsController',
            controllerAs: 'results'
        })

        // route for the contact page
        // .when('/contact', {
        //     templateUrl : 'views/pages/contact.html',
        //     controller  : 'contactController',
        //     controllerAs: 'contact'
        // });

    $locationProvider.html5Mode(true);
});