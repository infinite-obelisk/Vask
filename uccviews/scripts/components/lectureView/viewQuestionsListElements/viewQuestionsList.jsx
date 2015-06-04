var React = require('react'),
    MaterialMixin = require('./../../../mixins/material-ui.js'),
    ViewQuestionsListItem = require('./viewQuestionsListItem.jsx');

var ViewQuestionsList = React.createClass({
  mixins: [MaterialMixin],
  getInitialState: function(){
    return {questions: this.props.questions};
  },
  render: function(){
    var thiz = this;
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
  }
});

module.exports = ViewQuestionsList;