var React = require('react'),
    Voting = require('./../QAElements/voting.jsx');

var ViewQuestionsListItem = React.createClass({
  openQuestionDialog: function(){
    this.props.parentDiagClose();
    window.questionDialogs[this.props.questionId].show();
  },
  render: function(){
    return (<div className="row">
                <div className="row">
                  <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 text-center view-quest-list-item-vote">
                      <Voting votes={this.props.votes} questionId={this.props.questionId} />
                  </div>
                  <div className="col-lg-11 col-md-11 col-sm-11 col-xs-11 view-quest-list-item-question">
                      <h4>Q:&nbsp; 
                        <a
                          className="question-link"
                          href={this.props.questionUrl}
                          onClick={this.openQuestionDialog}>
                            {this.props.question}
                        </a>
                      </h4>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-8"></div>
                  <div className="col-md-2 text-center">
                    <span className="view-quest-list-item-answers">{this.props.numAnswers} answers</span>
                  </div>
                  <div className="col-md-2">
                    <span className="view-quest-list-item-time">{(this.props.time + "").toHHMMSS()}</span>
                  </div>
                </div>
                <hr className="view-quest-list-item-divisor"/>
            </div>);
  }
});

module.exports = ViewQuestionsListItem;