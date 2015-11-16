angular.module('homeCtrl', ['resultsService'])

.controller('homeController', function(Transaction) {

	var vm = this;

	vm.message = 'Upload your miData file below:';

    vm.csvReader = function() {

        var f = document.getElementById("fileUpload").files[0];
        // console.log(f);

        if (f) {
            var r = new FileReader();
            r.onload = function(e) { 
                var contents = e.target.result;
                var lines=contents.split("\n");
                var result = [];
                var headers=lines[0].split(",");

                // rename column headers to fit schema
                headers[0] = "date";
                headers[1] = "transtype";
                headers[2] = "merchant";
                headers[3] = "amount";
                headers[4] = "balance";
                
                // console.log(headers);
                // console.log(lines.length);
                
                for(var i=lines.length-1;i>0;i--){

                	var obj = {};

                	// removes commas within quotes, and splits by remaining commas
                    var myRE = /(\,)(?=[0-9]+\.)/;
                    var currentline=lines[i].replace(myRE, ""); // removes commas within numbers, if present
                    currentline = currentline.replace('"', ''); // removes quotation marks, if present
                    currentline = currentline.split(","); // splits on remaining commas

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
                    // result.push(obj);
                    Transaction.create(obj)
                        .success(function(data) {
                            vm.processing = false;
                            console.log(data.message);
                    });
                }   
                              
            }
                r.readAsText(f);
        } else { 
            alert("Failed to load file");
        }
            
    };

})