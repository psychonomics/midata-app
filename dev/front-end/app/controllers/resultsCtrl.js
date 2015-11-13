angular.module('resultsCtrl', ['resultsService'])

.controller('resultsController', function(User) {

	var vm = this;

    vm.message = 'Results will appear here...';

    // set a processing variable to show loading things
    vm.processing = true;

    // grab all the users at page load
    User.all()
        .success(function(data) {

            // when all the users come back, remove the processing variable
            vm.processing = false;

            // bind the users that come back to vm.users
            vm.users = data;
        });

    // run analysis script
    vm.analyse = function() {

        User.run()
            .success(function(data) {

                // when all the users come back, remove the processing variable
                vm.processing = false;

                // bind the users that come back to vm.users
                vm.analysis = data.message;
                console.log(data.message);
            });
    };
})
