var React = require('react'),
    Voting = require('./voting.jsx'),
    AnswerEntry = require('./answerEntry.jsx');

var Answer = React.createClass({
  render: function(){
    return (<div
              className="row answer">
                <div
                  className="col-lg-1 col-md-1 col-sm-1 col-xs-1 text-center">
                    <Voting
                      votes={this.props.votes}
                      questionId={this.props.questionId}
                      answerIndex={this.props.answerIndex} />
                </div>
                <AnswerEntry
                  user={this.props.user}
                  answer={this.props.answer}
                  answerTime={this.props.answerTime}/>
            </div>);
  }
});

module.exports = Answer;