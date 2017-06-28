// Load required packages
var mongoose = require('mongoose');

// Define our user schema
var UserSchema = new mongoose.Schema({
    username: {type: String},
    password : {type: String},
    user_type : {type: String},
    email: {type: String},
    verification: {type: Boolean},
   code:{type: String},
   Series_id: {type: Array}

});


// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);
