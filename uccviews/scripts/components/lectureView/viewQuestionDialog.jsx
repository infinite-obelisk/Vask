var React = require('react'),
    MaterialMixin = require('./../../mixins/material-ui.js'),
    ViewQuestionAndAnswers = require('./viewQuestionElements/viewQuestionsAndAnswers.jsx'),
    mui = require('material-ui'),
    FlatButton = mui.FlatButton,
    Dialog = mui.Dialog;

var ViewQuestionDialog = React.createClass({
  mixins: [MaterialMixin],
  getInitialState: function(){
    return {question: this.props.question};
  },
  openModal: function(){
    this.refs['ViewQuestionDialog' + this.state.question.questionId].show();
  },
  closeDialog: function(){
    console.log("View Question Dialog Close");
    this.refs['ViewQuestionDialog' + this.state.question.questionId].dismiss();
  },
  render: function(){
    var actions = [
      <FlatButton
        key={1}
        label="Close"
        secondary={true}
        onTouchTap={this.closeDialog} />
    ];

    return (<div>
              <div
                className="dialog-box">
                  <Dialog
                    ref={"ViewQuestionDialog" + this.state.question.questionId}
                    title="Question"
                    actions={actions} >
                      <ViewQuestionAndAnswers
                        votes={this.state.question.votes}
                        user={this.state.question.username}
                        question={this.state.question.title}
                        questionText={this.state.question.text}
                        questionId={this.state.question._id}
                        videoTime={this.state.question.time}
                        questionTime={this.state.question.createdAt}
                        answers={this.state.question.answers} />
                  </Dialog>
              </div>
            </div>);
  },
  componentDidMount: function(){
    if(!window.questionDialogs){ window.questionDialogs = {}; }
    window.questionDialogs[this.state.question._id] = this.refs["ViewQuestionDialog" + this.state.question.questionId];
  }
});

module.exports = ViewQuestionDialog;