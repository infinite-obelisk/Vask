var mongoose = require('mongoose');

var questionSchema = mongoose.Schema({
  video: { type: String, required: true},
  username: { type: String },
  time: { type: Number, required: true },
  title : { type : String},
  text: { type: String},
  votes: { type : Number},
  answers : []

});

var Question = mongoose.model('Question', questionSchema);

module.exports = Question;