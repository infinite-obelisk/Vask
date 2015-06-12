var React = require('react'),
    Voting = require('./../QAElements/voting.jsx');

var ViewQuestionsListItem = React.createClass({
  openQuestionDialog: function(){
    this.props.parentDiagClose();
    window.questionDialogs[this.props.questionId].show();
  },
  render: function(){
    return (<div
              className="row"
              style={{"marginBottom": "10px"}}>
                <div
                  className="col-lg-1 col-md-1 col-sm-1 col-xs-1 text-center">
                    <Voting
                      votes={this.props.votes}
                      questionId={this.props.questionId} />
                </div>
                <div
                  className="col-lg-11 col-md-11 col-sm-11 col-xs-11"
                  style={{"paddingTop": "28px"}}>
                    <h4>
                      <a
                        className="question-link"
                        href={this.props.questionUrl}
                        onClick={this.openQuestionDialog}>
                          {this.props.question}
                      </a>
                    </h4>
                </div>
            </div>);
  }
});

module.exports = ViewQuestionsListItem;