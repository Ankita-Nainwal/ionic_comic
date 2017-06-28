var mongoose = require('mongoose');
var ComicsSchema = new mongoose.Schema({
    Name: {type:String},
    Story: {type:String},
    image: {type:String},
    Season_id: {type:String},
    Series_id: { type: String},
    starts_on: {type:Date},
    Season_name: {type: String},
    Series_name: {type: String},
    ends_on: {type:Date},
    created_at: {type: Date, default: Date.now},
   updated_at: {type: Date, default: Date.now},
   comments: {type: Array}
});


// Export the Mongoose model
module.exports = mongoose.model('Comics', ComicsSchema);
