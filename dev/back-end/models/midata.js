var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

// midata schema
var MidataSchema = new Schema({
	date: Date,
	type: String,
	merchant: String,
	amount: Number,
	balance: Number
})

module.exports = mongoose.model('Midata', MidataSchema);