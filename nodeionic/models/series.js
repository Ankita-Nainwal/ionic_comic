var mongoose = require('mongoose');
var SeriesSchema = new mongoose.Schema({
    name: {type:String},
    description: {type:String},
    Series_id: {type:String},
     created_by: {type: String},
    created_at: {type: Date, default: Date.now},
   updated_at: {type: Date, default: Date.now},
   subscribers: {type: Array}
});


// Export the Mongoose model
module.exports = mongoose.model('Series', SeriesSchema);
