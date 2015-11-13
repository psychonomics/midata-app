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

            // grabs data for plot, first as strings
            var names = "";
            var ages = "";

            for (var i = 0; i < data.length; i++) {
                var name_i = data[i].fullname;
                var age_i = data[i].age;
                if (i != data.length - 1) {
                    names = names + name_i + ",";
                    ages = ages + age_i + ","; // comma separated strings can be converted to numeric arrays
                } else {
                    names = names + name_i;
                    ages = ages + age_i;
                };
            };
            // converts age string to numeric array, and parses string array
            ages = ages.split(',').map(Number);
            names = names.split(',');

            var dat = [{
                x: names,
                y: ages,
                type: 'bar'
            }];

            Plotly.newPlot('plot_area', dat);

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
