var React = require('react'),
    ViewQuestionsList = require('./viewQuestionsListElements/viewQuestionsList.jsx'),
    ViewQuestionsButton = require('./viewQuestionsListElements/viewQuestionsButton.jsx'),
    mui = require('material-ui'),
    FlatButton = mui.FlatButton,
    Dialog = mui.Dialog;

var ViewQuestionsDialog = React.createClass({
  openModal: function(){
    this.refs.ViewQuestionsDialog.show();
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
                        parentDiagClose={this.closeDialog}/>
                  </Dialog>
                  <ViewQuestionsButton
                    openModal={this.openModal} />
              </div>
            </div>);
  }
});

module.exports = ViewQuestionsDialog;