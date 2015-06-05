'use strict'

var React         = require('react'),
    mui           = require('material-ui'),
    TextField     = mui.TextField,
    MaterialMixin = require('../../mixins/material-ui.js');


var ContentForm = React.createClass({

  mixins: [MaterialMixin],

  getInitialState: function(){
    return {
      error2Text: ''
    }
  },

  _handleError2InputChange: function(){

  },

  render: function(){

    return (
            <div>
              <TextField
                floatingLabelText="Course Title"
                style={{"width": "95%", "height": "110px"}}
                errorText={this.state.error2Text}
                onChange={this._handleError2InputChange}
                defaultValue="" />
              <TextField
                floatingLabelText="Course Description"
                multiLine={true}
                style={{"width": "95%", "height": "110px"}}
                errorText={this.state.error2Text}
                onChange={this._handleError2InputChange}
                defaultValue="" />              
            </div>
           );
  }
});

module.exports = ContentForm;