var mongoose = require('mongoose');

var contentSchema = mongoose.Schema({
  url: { type: String, required: true},
  shortUrl: { type: String, required: true},
  title : { type : String},
  subtitle : { type : String},
  description : { type : String}
});

var Content = mongoose.model('Content', contentSchema);

module.exports = Content;