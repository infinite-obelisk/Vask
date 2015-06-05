var mongoose = require('mongoose');

var contentSchema = mongoose.Schema({
  url: { type: String, required: true},
  shortUrl: { type: String},
  title : { type : String},
  subtitle : { type : String},
  description : { type : String},
  course : { type : String },
  author : { type : mongoose.Schema.Types.ObjectId },
  questionCount : { type: Number},
  userCount : { type: Number}
});

var Content = mongoose.model('Content', contentSchema);

module.exports = Content;