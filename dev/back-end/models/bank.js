var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

// midata schema
var BankSchema = new Schema({
	bankname: String
})

module.exports = mongoose.model('Bank', BankSchema);