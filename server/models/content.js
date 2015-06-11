var mongoose = require('mongoose');

var contentSchema = mongoose.Schema({
  url: { type: String, required: true},
  shortUrl: { type: String},
  imgUrl : { type: String},
  title : { type : String},
  subtitle : { type : String},
  description : { type : String},
  course : { type : String },
  courseNum : { type : Number},
  author : { type : String },
  questionCount : { type: Number},
  userCount : { type: Number}
});

var Content = mongoose.model('Content', contentSchema);

module.exports = Content;