'use strict'

var React         = require('react'),
    mui           = require('material-ui'),
    TextField     = mui.TextField,
    MaterialMixin = require('../../mixins/material-ui.js');


var ContentForm = React.createClass({

  mixins: [MaterialMixin],

  getInitialState: function(){
    return {
      error2Text: 'This field is required.'
    }
  },

  _handleError2InputChange: function(){

  },

  render: function(){

    return (
            <div>
              <TextField
                hintText="Title"
                errorText={this.state.error2Text}
                onChange={this._handleError2InputChange}
                defaultValue="" />
              <TextField
                hintText="Description"
                errorText={this.state.error2Text}
                onChange={this._handleError2InputChange}
                defaultValue="" />              
              <TextField
                hintText="Video URL"
                errorText={this.state.error2Text}
                onChange={this._handleError2InputChange}
                defaultValue="" />
            </div>
           );
  }
});

module.exports = ContentForm;