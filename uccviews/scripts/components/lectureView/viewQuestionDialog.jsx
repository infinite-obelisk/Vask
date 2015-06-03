var React = require('react'),
    ViewQuestionAndAnswers = require('./viewQuestionElements/viewQuestionsAndAnswers.jsx'),
    mui = require('material-ui'),
    FlatButton = mui.FlatButton,
    Dialog = mui.Dialog;

var ViewQuestionDialog = React.createClass({
  getInitialState: function(){
    return {};
  },
  getQuestionData: function(){
    this.state.question = window.qObject[this.props.questionId];
  },
  openModal: function(){
    this.refs['ViewQuestionDialog' + this.state.question.questionId].show();
  },
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function(){
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  closeDialog: function(){
    console.log("View Question Dialog Close");
    this.refs['ViewQuestionDialog' + this.state.question.questionId].dismiss();
  },
  render: function(){
    this.getQuestionData();
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
                        imgUrl={this.state.question.imgUrl}
                        user={this.state.question.user}
                        question={this.state.question.question}
                        questionId={this.state.question.questionId}
                        videoTime={this.state.question.videoTime}
                        questionTime={this.state.question.questionTime}
                        answers={this.state.question.answers} />
                  </Dialog>
              </div>
            </div>);
  },
  componentDidMount: function(){
    if(!window.questionDialogs){ window.questionDialogs = {}; }
    window.questionDialogs[this.state.question.questionId] = this.refs["ViewQuestionDialog" + this.state.question.questionId];
  }
});

module.exports = ViewQuestionDialog;