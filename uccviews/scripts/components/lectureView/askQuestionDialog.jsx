var React             = require('react'),
    AskQuestionForm   = require('./askQuestionElements/askQuestionForm.jsx'),
    AskQuestionButton = require('./askQuestionElements/askQuestionButton.jsx'),
    MaterialMixin     = require('../../mixins/material-ui.js'),
    mui               = require('material-ui'),
    FlatButton        = mui.FlatButton,
    Dialog            = mui.Dialog;

var AskQuestionDialog = React.createClass({
  mixins: [MaterialMixin],
  openModal: function(){
    this.refs.AskQuestionDialog.show();
  },
  clearForm: function(){
    window.$('#question-title').val("");
    window.$('#question-text').val("");
  },
  closeDialog: function(){
    console.log("Ask Question Dialog Close");
    this.refs.AskQuestionDialog.dismiss();
  },
  submitQuestion: function(){
    console.log("Submit Question");
    console.log("Time question", Math.floor(window.player.getCurrentTime()));
    addQuestion.bind(this)();
  },
  render: function(){
    var actions = [
      <FlatButton
        key={1}
        label="Cancel"
        secondary={true}
        onTouchTap={this.closeDialog} />,
      <FlatButton
        key={2}
        label="Submit"
        primary={true}
        onTouchTap={this.submitQuestion} />
    ];

    return (<div>
              <Dialog
                ref="AskQuestionDialog"
                title="Ask a Question"
                actions={actions} >
                  <AskQuestionForm />
              </Dialog>
              <AskQuestionButton
                openModal={this.openModal}
                stopVideo={this.props.stopVideo} />
            </div>);
  }
});

module.exports = AskQuestionDialog;