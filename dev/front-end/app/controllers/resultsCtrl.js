angular.module('resultsCtrl', ['appService'])

.controller('resultsController', function(Transaction) {

	var vm = this;

    vm.message = 'Results will appear here...';

    // set a processing variable to show loading things
    vm.processing = true;

    // grab all the users at page load
    Transaction.all()
        .success(function(data) {

            // when all the users come back, remove the processing variable
            vm.processing = false;

            // bind the users that come back to vm.transactions
            vm.transactions = data;

            // grabs data for plot, first as strings
            var TransactionDate = "";
            var Balance = "";

            for (var i = 0; i < data.length; i++) {
                var TransactionDate_i = data[i].date.substring(0,10);
                var Balance_i = data[i].balance;
                if (i != data.length - 1) {
                    TransactionDate = TransactionDate + TransactionDate_i + ",";
                    Balance = Balance + Balance_i + ","; // comma separated strings can be converted to numeric arrays
                } else {
                    TransactionDate = TransactionDate + TransactionDate_i;
                    Balance = Balance + Balance_i;
                };
            };
            // converts age string to numeric array, and parses string array
            TransactionDate = TransactionDate.split(',');
            Balance = Balance.split(',').map(Number);

            var dat = [{
                x: TransactionDate,
                y: Balance,
                type: 'scatter'
            }];

            // console.log(dat);

            Plotly.newPlot('plot_area', dat);

        });


    // run analysis script
    vm.analyse = function() {

        Transaction.run()
            .success(function(data) {

                // when all the users come back, remove the processing variable
                vm.processing = false;

                // bind the users that come back to vm.users
                vm.analysis = data.message;
                console.log(data.message);
            });
    };
})
