'use strict'

var React         = require('react'),
    mui           = require('material-ui'),
    FlatButton    = mui.FlatButton,
    RaisedButton  = mui.RaisedButton,
    Dialog        = mui.Dialog,
    AddLectureForm   = require('./addLectureForm.jsx'),
	  MaterialMixin = require('../../mixins/material-ui.js');


var AddLecture = React.createClass({

	mixins: [MaterialMixin],

  getInitialState: function(){
    return {
      modal: true,
      course: undefined,
      title: undefined,
      desc: undefined,
      url: undefined,
      posted: false
    }
  },

  handleButtonClick: function(){
    console.log('opening dialog');
    this.refs.dialog.show();
  },

  _handleCustomDialogSubmit: function(){
    var lecture = {
      title: this.refs.form.state.title,
      course: this.refs.form.state.course,
      description: this.refs.form.state.desc,
      url: this.refs.form.state.url
    }

    this.setState({
      posted: lectureActions.addLecture(lecture)
    });
    console.log('Title', this.refs.form.state.title); 
    console.log('Course', this.refs.form.state.course); 
    console.log('Description', this.refs.form.state.desc); 
    console.log('Url', this.refs.form.state.url); 
    this.refs.dialog.dismiss();
  },
  
  _handleCustomDialogCancel: function(){
    console.log('dialog closed');
    this.refs.dialog.dismiss();
  },

  updateState: function(){
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