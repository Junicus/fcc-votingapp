var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Poll', new Schema({
  title: String,
  owner: String,
  created: { type: Date, default: Date.now },
  closed: { type: Date, default: null },
  options: [String]
}));
