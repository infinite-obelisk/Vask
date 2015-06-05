'use strict'

var React         = require('react'),
    mui           = require('material-ui'),
    FlatButton    = mui.FlatButton,
    RaisedButton  = mui.RaisedButton,
    Dialog        = mui.Dialog,
    AddLectureForm   = require('./addLectureForm.jsx'),
	  MaterialMixin = require('../../mixins/material-ui.js'),
    lectureActions    = require('../../actions/lectures'),
    lecturesStore     = require('../../stores/lectures');


var AddLecture = React.createClass({

	mixins: [MaterialMixin],

  getInitialState: function(){
    return {
      modal: true,
      course: undefined,
      title: undefined,
      desc: undefined,
      url: undefined
    }
  },

  handleButtonClick: function(){
    this.refs.dialog.show();
  },

  _handleCustomDialogSubmit: function(){
    // object with the new lecture info
    var lecture = {
      title: this.refs.form.state.title,
      course: this.refs.form.state.course,
      description: this.refs.form.state.desc,
      url: this.refs.form.state.url
    }

    // close the dialog
    this.refs.dialog.dismiss();

    // dispatch the data to be stored in the server
    lectureActions.addLecture(lecture);

  },
  
  _handleCustomDialogCancel: function(){
    // close the modal
    this.refs.dialog.dismiss();
  },

  render: function(){
    var self = this;
    // =============== Material Design Logic ================
    var customActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this._handleCustomDialogCancel} />,
      <RaisedButton
        label="Submit"
        secondary={true}
        onClick={this._handleCustomDialogSubmit} />
    ];
    // =======================================================

    return (
            <div>
              <Dialog
                ref="dialog"
                title="Add Lecture"
                actions={customActions}
                modal={this.state.modal}>
                <AddLectureForm ref="form" />
              </Dialog>

              <RaisedButton 
                label="+ Add Lecture"
                onClick={this.handleButtonClick}                
                onTouchTap={this.handleButtonClick} 
                secondary={true} 
                style={{"float": "right"}}/>
            </div>
           );
  }
});

module.exports = AddLecture;