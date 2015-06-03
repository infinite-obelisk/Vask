var mongoose = require('mongoose');

var contentSchema = mongoose.Schema({
  url: { type: String, required: true},
  shortUrl: { type: String, required: true},
  title : { type : String},
  subtitle : { type : String},
  description : { type : String},
  author : { type : mongoose.Schema.Types.ObjectId }
});

var Content = mongoose.model('Content', contentSchema);

module.exports = Content;