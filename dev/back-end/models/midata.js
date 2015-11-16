var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

// midata schema
var TransactionSchema = new Schema({
	date: Date,
	transtype: String,
	merchant: String,
	amount: Number,
	balance: Number
})

module.exports = mongoose.model('Transaction', TransactionSchema);