var url = require('url');
var Question = require('../models/question');
var Content = require('../models/content');
var util = require('../utilities');

exports.addQuestion = function (req, res) {
	var info = req.body;
  console.log('addQuestion ',info)
	var newQuestion = new Question({
       video: info.video ,
       username: util.getUserName(req),
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
        Content.update({shortUrl : info.video}, {'$inc':{'questionCount': 1}}, function (err, data){
          if (!err) {
            console.log(err);
          }
          updateUserCount(info.video, function() {
            res.status(201).send({msg : 'you posted to the database'});  
          })
          
        });

      }
	});

};

var updateUserCount = function (shortUrl, callback) {
  console.log('updateUserCount ', shortUrl);
  Question.find({video : shortUrl}, function (err, questions) {
     if (err) console.log(err);
     if (!err) {
      var allUser = {};
      console.log('found questions ', questions.length);
      questions.forEach(function(question) {
        allUser[question.userName] = true;
        question.answers.forEach(function(answer){
          allUser[answer.userName] = true;
        })
      })
      var c = 0;
      for (var k in allUser) c++;
      console.log('alluser ',allUser, c);
      Content.update({shortUrl : shortUrl}, {userCount : c}, function(){
        callback();
      })

     }
  })
}

exports.addAnswer = function(req, res) {
  var info = req.body;
  var answer = { text : info.text, votes : 0, createdAt : new Date().getTime(), userName : util.getUserName(req)};
  console.log('adding answer ', answer);
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
