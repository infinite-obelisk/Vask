var mongoose = require('mongoose');


var questionSchema = mongoose.Schema({
  video: { type: String, required: true},
  username: { type: String },
  time: { type: Number, required: true },
  text: { type: String}

});

var Question = mongoose.model('Question', questionSchema);

module.exports = Question;