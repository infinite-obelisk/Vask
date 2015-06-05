var React = require('react'),
    MaterialMixin = require('./../../../mixins/material-ui.js'),
    mui = require('material-ui'),
    IconButton = mui.IconButton;


var Voting = React.createClass({
  mixins: [MaterialMixin],
  voteQuestion: function(questionId, inc, answerIndex){
    var data = {
      inc : inc,
      _id : questionId
    };
    var url = '/votequestion';
    if (answerIndex!==undefined) {
      data.idx = answerIndex;
      url = '/voteanswer'
    }
    $.ajax({
      url: url,
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(data),
      statusCode: {
        201: function (data) {
          console.log('win');
          console.log(data);
          },
        500: function (err) {
          console.log('lose')
        }
      }
    });
  },
  voteUp: function(){
    console.log("vote up");
    var isAnswer = this.props.answerIndex !== undefined;
    var answerIndex = this.props.answerIndex;
    var questionId = this.props.questionId;
    this.setState({votes: (this.props.votes + 1)});
    if(isAnswer){
      console.log('vote answer');
      this.voteQuestion(questionId,1,answerIndex);
    } else {
      console.log('question up vote');
      this.voteQuestion(questionId,1);
    }
  },
  voteDown: function(){
    console.log("vote down");
    var isAnswer = this.props.answerIndex !== undefined;
    var answerIndex = this.props.answerIndex;
    var questionId = this.props.questionId;
    this.setState({votes: (this.props.votes - 1)});
    if(isAnswer){
      console.log('vote answer');
      this.voteQuestion(questionId,-1,answerIndex);
    } else {
      this.voteQuestion(questionId,-1);
    }
  },
  getInitialState: function(){
    return {votes: this.props.votes};
  },
  render: function(){
    return (<div
              className="media-left voting">
                <IconButton
                  iconClassName="mdi mdi-chevron-up vote-button"
                  tooltip="Vote Up"
                  onClick={this.voteUp} />
                <p
                  className="votes">
                    <span>{this.state.votes}</span>
                </p>
                <IconButton
                  iconClassName="mdi mdi-chevron-down vote-button"
                  tooltip="Vote Down"
                  onClick={this.voteDown} />
            </div>
            );
  }
});

module.exports = Voting;