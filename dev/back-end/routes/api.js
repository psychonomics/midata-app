var bodyParser = require('body-parser'); 	// get body-parser
var Transaction= require('../models/midata');
var Bank	   = require('../models/bank');
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

	// on routes that end in /bank
	// ----------------------------------------------------
	apiRouter.route('/bank')

		// create a bank entry (accessed at POST http://localhost:8080/api/bank)
		.post(function(req, res) {

			var bank = new Bank();		// create a new instance of the Bank model
			
			bank.bankname = req.body.bankname; // set the bank name (comes from the request)
			
			bank.save(function(err) {
				if (err) {
					return res.send(err);
				}

			// return a message
				res.json({ message: 'Bank name received!' });
			});		

		})

		// get all banks posted (accessed at GET http://localhost:8080/api/bank)
		.get(function(req, res) {

			Bank.find({}, function(err, banks) {
				if (err) res.send(err);

				// return the transactions
				res.json(banks);
			});
		});


	// on routes that end in /bank/:bank_id
	// ----------------------------------------------------
	apiRouter.route('/bank/:bank_id')

		.get(function(req, res) {
			Bank.findById(req.params.bank_id, function(err, bank) {
				if (err) res.send(err);

				// return that bank
				res.json(bank);
			});
		})

		// delete the bank with this id
		.delete(function(req, res) {
			Bank.remove({
				_id: req.params.bank_id
			}, function(err, bank) {
				if (err) res.send(err);

				res.json({ message: 'Successfully deleted' });
			});
		});

	// on routes that end in /midata
	// ----------------------------------------------------
	apiRouter.route('/midata')

		// create a transaction (accessed at POST http://localhost:8080/api/midata)
		.post(function(req, res) {

			// for (var i = 0; i < req.body.length ; i++) { PLACEHOLDER - COULD USE TO POST ARRAY IN ONE STEP
			// IF YOU TRY THIS, BE SURE TO REFER TO body[i] ELEMENTS IN WHAT FOLLOWS	
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