angular.module('homeCtrl', ['appService'])

.controller('homeController', function($scope, Transaction, Bank) {

    // only instance of using scope, for page animation
    $scope.pageClass = 'page-home';

	var vm = this;

    vm.options = [{ bankname: "Barclays"}, { bankname: "HSBC"}, { bankname: "Lloyds"}, { bankname: "Nationwide" }];
    vm.selectedOption = "";

    vm.csvReader = function() {

        var f = document.getElementById("fileUpload").files[0];

        if (vm.selectedOption === "") {
            alert("Please select your current provider");
        } else if (!f) {
            alert("Please select a file to upload");
        } else{

            // turn on loading indicator
            vm.loading = true;

            // post bank name to mongo ---------------------------------------
            // console.log("Your selected bank is " + vm.selectedOption.bankname)
            Bank.create(vm.selectedOption)
                .success(function(data) {
                    vm.processing = false;
                    console.log(data.message);
                });

            // parse midata csv and send to mongo ----------------------------
            var r = new FileReader();
            r.onload = function(e) { 
                var contents = e.target.result;
                var lines=contents.split("\n");
                var headerLine = [];
                    
                for(var i=0;i<lines.length;i++){
                    if (lines[i].indexOf("Date") > -1){
                        headerLine = i;
                    };
                };

                // console.log(headerLine);
                var headers=lines[headerLine].split(",");

                // rename column headers to fit schema
                headers[0] = "date";
                headers[1] = "transtype";
                headers[2] = "merchant";
                headers[3] = "amount";
                headers[4] = "balance";
                    
                // console.log(headers);
                // console.log(lines.length);
                    
                for(var i=0;i<lines.length;i++){

                    // ensures only data lines are processed
                    if (lines[i].substring(0,3).match(/[0-9][0-9]/) != null) {

                     	var obj = {};

                       	// splits by commas not in quotes
                        var myRE = /(".*?"|[^",]+)(?=\s*,|\s*$)/g;
                        var currentline = lines[i].match(myRE);

                        // converts date to US date format
                        var dateparts = currentline[0].split("/"); 
        		  	    currentline[0] = dateparts[1] + "/" + dateparts[0] + "/" + dateparts[2];               

        				// removes £ signs
                        currentline[3] = accounting.unformat(currentline[3]);   // reformat using accounting package
                        currentline[4] = accounting.unformat(currentline[4]);   // reformat using accounting package
                          
                        // debugging
                        // console.log(lines[i]);
                        // console.log(currentline);

                        for(var j=0;j<headers.length;j++){
                            obj[headers[j]] = currentline[j];
                        }

                        // console.log(obj);
                        Transaction.create(obj)
                            .success(function(data) {
                                vm.processing = false;
                                console.log(data.message);
                        });
                        
                    }                
                }
            vm.loading = false;
            vm.done = true;
            }
            r.readAsText(f);    
        };
    }
})