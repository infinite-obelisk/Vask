var React = require('react'),
    MaterialMixin = require('./../../mixins/material-ui.js'),
    ViewQuestionsList = require('./viewQuestionsListElements/viewQuestionsList.jsx'),
    ViewQuestionsButton = require('./viewQuestionsListElements/viewQuestionsButton.jsx'),
    mui = require('material-ui'),
    FlatButton = mui.FlatButton,
    Dialog = mui.Dialog;

var ViewQuestionsDialog = React.createClass({
  mixins: [MaterialMixin],
  openModal: function(){
    this.refs.ViewQuestionsDialog.show();
  },
  closeDialog: function(){
    console.log("Ask Question Dialog Close");
    this.refs.ViewQuestionsDialog.dismiss();
  },
  submitQuestion: function(){
    this.clearForm();
    console.log("Submit Question");
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
                    ref="ViewQuestionsDialog"
                    title="Questions for this lecture"
                    actions={actions} >
                      <ViewQuestionsList
                        parentDiagClose={this.closeDialog}
                        questions={this.props.questions}/>
                  </Dialog>
                  <ViewQuestionsButton
                    openModal={this.openModal} />
              </div>
            </div>);
  }
});

module.exports = ViewQuestionsDialog;