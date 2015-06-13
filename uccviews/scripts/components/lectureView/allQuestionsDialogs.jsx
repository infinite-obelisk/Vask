var React = require('react'),
    MaterialMixin = require('./../../mixins/material-ui.js'),
    questionsActions  = require('../../actions/questions'),
    lecturesStore  = require('../../stores/lectures'),
    ViewQuestionDialog  = require('./viewQuestionDialog.jsx');

var AllQuestionsDialogs = React.createClass({
  mixins: [MaterialMixin],

  render: function(){
    var questions = lecturesStore.getQuestions();
    var thiz = this;
    return (<div>
              {questions.map(function(question, i){
                return (<ViewQuestionDialog
                          question={question}
                          shortUrl={thiz.props.shortUrl}/>);
              })}
            </div>);
  }
});

module.exports = AllQuestionsDialogs;