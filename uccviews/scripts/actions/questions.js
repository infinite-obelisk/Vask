'use strict'

var Dispatcher = require('../dispatcher/dispatcher'),
  assign     = require('object-assign'),
  request    = require('superagent'),
  questionsConstants = require('../constants/questions');

module.exports = {

  // When ready, dispatch the questions to the store
  setQuestions: function(questions){
    Dispatcher.handleViewAction({
      actionType: questionsConstants.SET_QUESTIONS,
      questions: questions
    });
  },

  getQuestions: function(videoId){
    // console.log('Updating the list of questions');
    var thiz = this,
        url = "/getquestions?video=" + videoId;

    request.get(url)
           .set('Accept', 'application/json')
           .end(function(err, res){
              if (err) {
                // console.log('Failed fetching the server');
                throw err;
              }
              // console.log('response from the server', res);
              if(res.ok){

                var questions = res.body.result;
                // console.log('All questions arrived.. sending to dispatcher');
                thiz.setQuestions(questions);
              } else {
                // console.log('Response is not ok');
              }
           });
  },

  addQuestion: function(question){
    // console.log('Submiting question..');
    var self = this,
        url = '/addquestion';
    // Request the API for the data (lectures)
    request.post(url)
         .send(question)
         .set('Accept', 'application/json')
         .end(function(err, res){
          if (err) {
            // console.log('Failed fetching the server: lectures');
            throw err;
          }
          // console.log('response from the server', res);
          if(res.ok){
            // console.log('Question successfuly added.');
            // after successfuly saved, update the questions passing the video ID
            self.getQuestions(question.video);
            

          } else {
            // thow the error
            // console.log('Ask question is not ok');
          }
         });

  }
}