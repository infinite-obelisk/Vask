var React = require('react'),
    MaterialMixin = require('./../../../mixins/material-ui.js'),
    questionsActions  = require('../../../actions/questions'),
    questionsStore  = require('../../../stores/questions'),
    ViewQuestionsListItem = require('./viewQuestionsListItem.jsx');

var ViewQuestionsList = React.createClass({
  mixins: [MaterialMixin],
  getInitialState: function(){
    return {
              loaded: false
           };
  },
  _onChange: function(){
    this.setState({
      loaded: true,
      questions: questionsStore.getQuestions()
    });
  },
  componentDidMount: function(){
    // Add the listener
    // We use _ onChange because it's a method
    questionsStore.addChangeListener(this._onChange);
  },
  render: function(){
    var thiz = this;
    if(this.state.questions){
      return (<div>
                {this.state.questions.map(function(question){
                  return (<div>
                            <ViewQuestionsListItem
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