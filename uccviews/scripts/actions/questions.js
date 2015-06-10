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
    var thiz = this,
        url = "/getquestions?video=" + videoId;

    request.get(url)
           .set('Accept', 'application/json')
           .end(function(err, res){
              if (err) {
                console.log('Failed fetching the server');
                throw err;
              }
              console.log('response from the server', res);
              if(res.ok){

                var questions = res.body.result;
                thiz.setQuestions(questions);
              } else {
                console.log('Response is not ok');
              }
           });
  }
}