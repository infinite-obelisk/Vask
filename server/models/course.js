var mongoose = require('mongoose');

var courseSchema = mongoose.Schema({
  title : { type : String},
  subtitle : { type : String},
  description : { type : String},
  author : { type : mongoose.Schema.Types.ObjectId },
  contents : []
});

var Course = mongoose.model('Course', courseSchema);

module.exports = Course;