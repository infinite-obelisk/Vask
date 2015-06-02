var React = require('react'),
    ViewQuestionsListItem = require('./viewQuestionsListItem.jsx');

var ViewQuestionsList = React.createClass({
  getInitialState: function(){
    return {};
  },
  getQuestionsList: function(){
    this.state.questions = window.videoData;
  },
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function(){
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  render: function(){
    this.getQuestionsList();
    var thiz = this;
    return (<div>
              {this.state.questions.map(function(question){
                return (<div>
                          <ViewQuestionsListItem
                            votes={question.votes}
                            question={question.question}
                            questionUrl={question.questionUrl}
                            questionId={question.questionId}
                            key={question.key}
                            parentDiagClose={thiz.props.parentDiagClose} />
                        </div>);
              })}
            </div>);
  }
});

module.exports = ViewQuestionsList;