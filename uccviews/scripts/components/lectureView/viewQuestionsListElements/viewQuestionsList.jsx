var React = require('react'),
    MaterialMixin = require('./../../../mixins/material-ui.js'),
    questionsActions  = require('../../../actions/questions'),
    lecturesStore  = require('../../../stores/lectures'),
    ViewQuestionsListItem = require('./viewQuestionsListItem.jsx');

var ViewQuestionsList = React.createClass({

  mixins: [MaterialMixin],

  getInitialState: function(){
    return {
              loaded: false
           };
  },

  render: function(){
    console.log('this.props.question viewQuestionsList', this.props.questions);
    var questions = lecturesStore.getQuestions();
    var thiz = this;
    if(questions.length){
      questions.sort(function(a, b){
        return b.votes - a.votes;
      });
      return (<div>
                {questions.map(function(question){
                  return (<div>
                            <ViewQuestionsListItem
                              time={question.time}
                              numAnswers={question.answers.length}
                              votes={question.votes}
                              question={question.title}
                              questionUrl={question.questionUrl}
                              questionId={question._id}
                              key={question._id}
                              parentDiagClose={thiz.props.parentDiagClose} />
                          </div>);
                })}
              </div>);
    } else {
      return (<div>
                There are no questions for this video.
              </div>);
    }
  }
});

module.exports = ViewQuestionsList;