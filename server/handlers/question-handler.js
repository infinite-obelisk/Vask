var url = require('url');
var Question = require('../models/question');
var Content = require('../models/content');

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
       createdAt : new Date().getTime(),
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
        Content.update({shortUrl : info.video}, {'$inc':{'questionCount': 1}}, function (err, data){
          if (!err) {
            console.log(err);
          }
        });

      }
	});

};

exports.addAnswer = function(req, res) {
  var info = req.body;
  console.log('adding answer ', info);
  var answer = { text : info.text, votes : 0, createdAt : new Date().getTime()};
  Question.update({_id : info._id}, {'$push':{'answers': answer}}, function (err, data){
    if (!err) {
      res.status(201).send({msg : 'answered'});
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
      res.status(201).send({msg : 'voted ' + info.inc});
    } else {
      res.status(500).send({msg : 'error while inserting into db'});
    }
  }); 
}

exports.voteAnswer = function (req, res) {
  var info = req.body;
  console.log('voteAnswer', info);
  if (info.inc === 'down' || info.inc === -1 || info.inc === '-1') info.inc = -1; else info.inc = 1;
  Question.findOne({_id : info._id}, function (err, question) {
    question.answers[info.idx].votes += info.inc;
    question.markModified('answers');
    question.save(function (err) {
      console.log('saving');
      if (err) console.log(err);
    });
  });
  res.status(201).send({msg : 'voted ' + info.inc});
  return; 
  Question.update({_id : info._id}, {'$inc':{'votes': info.inc}}, function (err, data){
    if (!err) {
      res.status(201).send({msg : 'voted ' + info.inc});
    } else {
      res.status(500).send({msg : 'error while inserting into db'});
    }
  }); 
}
