'use strict'

var React         = require('react'),
    mui           = require('material-ui'),
    FlatButton    = mui.FlatButton,
    RaisedButton  = mui.RaisedButton,
    Dialog        = mui.Dialog,
    ContentForm   = require('./contentForm.jsx'),
	  MaterialMixin = require('../../mixins/material-ui.js');


var AddLecture = React.createClass({

	mixins: [MaterialMixin],

  getInitialState: function(){
    return {
      modal: true
    }
  },

  handleButtonClick: function(){
    console.log('opening dialog');
    this.refs.dialog.show();
  },

  _handleCustomDialogSubmit: function(){
    console.log('saving content');
    this.refs.dialog.dismiss();
    // TBD
  },
  
  _handleCustomDialogCancel: function(){
    console.log('dialog closed');
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
                title="Send your content"
                actions={customActions}
                modal={this.state.modal}>
                <ContentForm/>
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