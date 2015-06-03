var React = require('react'),
    Voting = require('./voting.jsx'),
    QuestionEntry = require('./questionEntry.jsx');

var Question = React.createClass({
  render: function(){
    return (<div
              className="row question">
              <div
                className="col-lg-1 col-md-1 col-sm-1 col-xs-1 text-center">
                  <Voting
                    votes={this.props.votes}
                    questionId={this.props.questionId} />
              </div>
              <QuestionEntry
                user={this.props.user}
                question={this.props.question}
                videoTime={this.props.videoTime}
                questionTime={this.props.questionTime}/>
            </div>);
  }
});

module.exports = Question;