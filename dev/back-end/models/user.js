var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

// user schema 
var UserSchema   = new Schema({
	username: String,
	fullname: String,
	age: Number
});

module.exports = mongoose.model('User', UserSchema);