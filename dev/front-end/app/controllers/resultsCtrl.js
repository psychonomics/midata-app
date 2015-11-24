angular.module('resultsCtrl', ['appService'])

.controller('resultsController', function($scope, Transaction) {

    // only instance of using scope, for page animation
    $scope.pageClass = 'page-results';

	var vm = this;

    // // set a processing variable to show loading things
    // vm.processing = true;

    // grab all the transactions at page load
    Transaction.all()
        .success(function(data) {

            // when all the transactions come back, remove the processing variable
            vm.processing = false;

            // create display tag to allow for variation in content
            if (data.length === 0) {
                vm.displaytag = false;
            } else {
                vm.displaytag = true;
            };

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
            // parses date/balance arrays, converts latter to numeric
            TransactionDate = TransactionDate.split(',');
            Balance = Balance.split(',').map(Number);

            var dat = [{
                x: TransactionDate,
                y: Balance,
                type: 'scatter'
            }];

            // console.log(dat);

            Plotly.newPlot('plot_area', dat);

            // reformat currency values for display
            for (var i = 0; i < data.length; i++) {
                if (accounting.formatMoney(data[i].amount, "£").substring(1,2) === "-") {
                    data[i].amount = "-"+accounting.formatMoney(data[i].amount, "£").replace("-","");
                } else {
                    data[i].amount = "+"+accounting.formatMoney(data[i].amount, "£");
                };
            };
            for (var i = 0; i < data.length; i++) {
                if (accounting.formatMoney(data[i].balance, "£").substring(1,2) === "-") {
                    data[i].balance = "-"+accounting.formatMoney(data[i].balance, "£").replace("-","");
                } else {
                    data[i].balance = accounting.formatMoney(data[i].balance, "£");
                };
            };

            // bind the transaction data that come back to vm.transactions
            vm.transactions = data;

        });


    // run analysis script
    vm.analyse = function() {

        // create loading indicator
        vm.loading = true;

        Transaction.run()
            .success(function(data) {

                // when the data come back, remove the processing variable
                vm.processing = false;

                // bind the data that come back to vm.analysis
                vm.analysis = data.message;
                console.log(data.message);
                vm.loading = false;
        });
    };
})
