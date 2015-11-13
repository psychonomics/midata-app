var bodyParser = require('body-parser'); 	// get body-parser
var User       = require('../models/user');
var config     = require('../../config');
var rio 	   = require('rio');
var path 	   = require('path');	

// var dat = {
//     args: [1, 2, 3]
// };

module.exports = function(app, express) {

	var apiRouter = express.Router();

	// test route to make sure everything is working 
	// accessed at GET http://localhost:8080/api
	apiRouter.get('/', function(req, res) {
		res.json({ message: 'hooray! welcome to our api!' });	
	});

	// on routes that end in /users
	// ----------------------------------------------------
	apiRouter.route('/users')

		// create a user (accessed at POST http://localhost:8080/users)
		.post(function(req, res) {
			
			var user = new User();		// create a new instance of the User model
			user.username = req.body.username;  // set the users name (comes from the request)
			user.fullname = req.body.fullname;  // set the users username (comes from the request)
			user.age = req.body.age;  // set the users password (comes from the request)

			user.save(function(err) {
				if (err) {
					return res.send(err);
				}

				// return a message
				res.json({ message: 'User created!' });
			});

		})

		// get all the users (accessed at GET http://localhost:8080/api/users)
		.get(function(req, res) {

			User.find({}, function(err, users) {
				if (err) res.send(err);

				// return the users
				res.json(users);
			});
		});

	// on routes that end in /users/:user_id
	// ----------------------------------------------------
	apiRouter.route('/users/:user_id')

		.get(function(req, res) {
			User.findById(req.params.user_id, function(err, user) {
				if (err) res.send(err);

				// return that user
				res.json(user);
			});
		})

		// delete the user with this id
		.delete(function(req, res) {
			User.remove({
				_id: req.params.user_id
			}, function(err, user) {
				if (err) res.send(err);

				res.json({ message: 'Successfully deleted' });
			});
		});

	// custom route for executing R sript
	// ----------------------------------------------------
	apiRouter.route('/script')

		.get(function(req, res){
			
			//console.log(__dirname);
			//console.log(dat);

			function displayResponse(err, response) {
				response = JSON.parse(response);
        		if (!err) {
        	    	console.log("The sum of user ages is " + response[0]);
        	    	res.json({ message: 'The sum of user ages is ' + response[0]});
        		} else {
        	    	console.log("Rserve call failed. " + err);
        		}
    		};

			// rio.sourceAndEval(path.join(__dirname, "test.R"), {
    		rio.sourceAndEval("/home/jackwright/Documents/1_Projects/5_MiData/dev/back-end/scripts/test.R", {	
    			entryPoint: "adder",
    			callback: displayResponse
			});

			// console.log(__dirname);
			//rio.evaluate("pi / 2 * 2");
			// res.json({ message: 'Script executed!'});
		});

	return apiRouter;
};