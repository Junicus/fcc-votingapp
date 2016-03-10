var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PollSchema = new Schema({
    title: String,
    owner: String,
    created: { type: Date, default: Date.now },
    closed: { type: Date, default: null },
    options: [String]
});

module.exports = mongoose.model('Poll', PollSchema);