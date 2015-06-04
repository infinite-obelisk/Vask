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
    $.ajax({
      url: "/addquestion",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({
        video : 'test2',
        text : window.$('#question-text').val(),
        username : 'name',
        time : Math.floor(this.props.getCurrentTime()),
        title : window.$('#question-title').val()
      }),
      statusCode: {
        201: function (data) {
          console.log('win');
          console.log(data);
          self.clearForm();
          self.closeDialog();
        },
        500: function (err) {
          console.log('lose')
        }
      }
    });
    this.clearForm();
    this.closeDialog();
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