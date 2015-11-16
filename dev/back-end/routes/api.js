var bodyParser = require('body-parser'); 	// get body-parser
// var User       = require('../models/user');
var Transaction= require('../models/midata');
var config     = require('../../config');
var rio 	   = require('rio');
var path 	   = require('path');	

module.exports = function(app, express) {

	var apiRouter = express.Router();

	// test route to make sure everything is working 
	// accessed at GET http://localhost:8080/api
	apiRouter.get('/', function(req, res) {
		res.json({ message: 'hooray! welcome to our api!' });	
	});

	// on routes that end in /midata
	// ----------------------------------------------------
	apiRouter.route('/midata')

		// create a user (accessed at POST http://localhost:8080/api/midata)
		.post(function(req, res) {
			
			var transaction = new Transaction();		// create a new instance of the Midata model
			transaction.date = req.body.date;  // set the transaction date (comes from the request)
			transaction.transtype = req.body.transtype;  // set the transaction type (comes from the request)
			transaction.merchant = req.body.merchant; // set the transaction merchant
			transaction.amount = req.body.amount; // set the transaction amount
			transaction.balance = req.body.balance;  // set the account balance after transaction (comes from the request)

			transaction.save(function(err) {
				if (err) {
					return res.send(err);
				}

				// return a message
				res.json({ message: 'Transaction processed!' });
			});

		})

		// get all transactions (accessed at GET http://localhost:8080/api/midata)
		.get(function(req, res) {

			Transaction.find({}, function(err, transactions) {
				if (err) res.send(err);

				// return the transactions
				res.json(transactions);
			});
		});

	// on routes that end in /midata/:transaction_id
	// ----------------------------------------------------
	apiRouter.route('/midata/:transaction_id')

		.get(function(req, res) {
			Transaction.findById(req.params.transaction_id, function(err, transaction) {
				if (err) res.send(err);

				// return that transaction
				res.json(transaction);
			});
		})

		// delete the transaction with this id
		.delete(function(req, res) {
			Transaction.remove({
				_id: req.params.transaction_id
			}, function(err, transaction) {
				if (err) res.send(err);

				res.json({ message: 'Successfully deleted' });
			});
		});

	// // on routes that end in /users
	// // ----------------------------------------------------
	// apiRouter.route('/users')

	// 	// create a user (accessed at POST http://localhost:8080/users)
	// 	.post(function(req, res) {
			
	// 		var user = new User();		// create a new instance of the User model
	// 		user.username = req.body.username;  // set the users name (comes from the request)
	// 		user.fullname = req.body.fullname;  // set the users username (comes from the request)
	// 		user.age = req.body.age;  // set the users password (comes from the request)

	// 		user.save(function(err) {
	// 			if (err) {
	// 				return res.send(err);
	// 			}

	// 			// return a message
	// 			res.json({ message: 'User created!' });
	// 		});

	// 	})

	// 	// get all the users (accessed at GET http://localhost:8080/api/users)
	// 	.get(function(req, res) {

	// 		User.find({}, function(err, users) {
	// 			if (err) res.send(err);

	// 			// return the users
	// 			res.json(users);
	// 		});
	// 	});

	// // on routes that end in /users/:user_id
	// // ----------------------------------------------------
	// apiRouter.route('/users/:user_id')

	// 	.get(function(req, res) {
	// 		User.findById(req.params.user_id, function(err, user) {
	// 			if (err) res.send(err);

	// 			// return that user
	// 			res.json(user);
	// 		});
	// 	})

	// 	// delete the user with this id
	// 	.delete(function(req, res) {
	// 		User.remove({
	// 			_id: req.params.user_id
	// 		}, function(err, user) {
	// 			if (err) res.send(err);

	// 			res.json({ message: 'Successfully deleted' });
	// 		});
	// 	});

	// custom route for executing R sript
	// ----------------------------------------------------
	apiRouter.route('/script')

		.get(function(req, res){

			function displayResponse(err, response) {
				response = JSON.parse(response);
        		if (!err) {
        	    	console.log("Your average balance is £" + response[0]);
        	    	res.json({ message: 'Your average balance is £' + response[0]});
        		} else {
        	    	console.log("Rserve call failed. " + err);
        		}
    		};

			rio.sourceAndEval(path.join(__dirname, "../scripts/test.R"), {
    			entryPoint: "adder",
    			callback: displayResponse
			});

		});

	return apiRouter;
};