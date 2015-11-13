angular.module('homeCtrl', ['resultsService'])

.controller('homeController', function(User) {

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

                for(var i=1;i<lines.length;i++){

                    var obj = {};
                    var currentline=lines[i].split(",");

                    for(var j=0;j<headers.length;j++){
                        obj[headers[j]] = currentline[j];
                    }

                    // result.push(obj);
                    User.create(obj)
                        .success(function(data) {
                            vm.processing = false;
                            console.log(data.message);
                    });
                }                  
                //return result; //JavaScript object
                //console.log(JSON.stringify(result)); //JSON
                              
                }
                r.readAsText(f);
            } else { 
                alert("Failed to load file");
            }
            
    };

    // $scope.csv = {
 //    	content: null,
 //    	header: true,
 //    	headerVisible: true,
 //    	separator: ',',
 //    	separatorVisible: true,
 //    	result: null,
 //    	encoding: 'ISO-8859-1',
 //    	encodingVisible: true,
 //    };

})