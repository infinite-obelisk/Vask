var url = require('url');
var Question = require('../models/question');

exports.addQuestion = function (req, res) {
	var info = req.body;
  console.log('addQuestion ',info)
	var newQuestion = new Question({
       video: info.video ,
       username: info.username,
       time: info.time,
       text: info.text,
       title: info.title,
       votes : 0,
       answers : []
	});
	newQuestion.save(function (err) {
	    if(err) {
        console.log('error in saving question', err);
        res.status(500).send('error in saving new question');
      }
      else {
        console.log('added question');
        res.status(201).send({msg : 'you posted to the database'});
      }
	});

};

exports.addAnswer = function(req, res) {
  var info = req.body;
  console.log('adding answer ', info);
  var answer = { text : info.text, votes : 0};
  Question.update({_id : info._id}, {'$push':{'answers': answer}}, function (err, data){
    if (!err) {
      res.status(202).send({msg : 'answered'});
    } else {
      res.status(500).send({msg : 'error while inserting into db'});
    }
  });    
  
}

exports.getQuestions = function (req, res) {
	console.log('getQuestions', req.url);
	var video = req.query.video;
	Question.find({video : video}, function (err, questions){
		if (!err)
			res.status(200).send({result : questions});
		else {
			console.log(err);
			res.status(500).send('Error fetching questions');
		}
	});

};

exports.voteQuestion = function (req, res) {
  var info = req.body;
  console.log('voteQuestion', info);
  if (info.inc === 'down' || info.inc === -1 || info.inc === '-1') info.inc = -1; else info.inc = 1;
  Question.update({_id : info._id}, {'$inc':{'votes': info.inc}}, function (err, data){
    if (!err) {
      res.status(202).send({msg : 'voted ', info.inc});
    } else {
      res.status(500).send({msg : 'error while inserting into db'});
    }
  }); 
}
