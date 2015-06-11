'use strict'

var React         = require('react'),
    mui           = require('material-ui'),
    TextField     = mui.TextField,
    MaterialMixin = require('../../mixins/material-ui.js');


var ContentForm = React.createClass({

  mixins: [MaterialMixin, React.addons.LinkedStateMixin],

  getInitialState: function(){
    return {
      error2Text: '',
      course: undefined,
      title: undefined,
      desc: undefined,
      url: undefined,
      propValue: 'aa'
    }
  },

  componentDidMount: function(){
    $("#new-lecture-course").appendTo($("#new-lecture-course").parent());
    $("#new-lecture-title").appendTo($("#new-lecture-title").parent());
    $("#new-lecture-description").parent().appendTo($("#new-lecture-description").parent().parent());
    $("#new-lecture-url").appendTo($("#new-lecture-url").parent());
  },

  _handleError2InputChange: function(event){
    console.log('Changing');
    console.log('STATE', this.state);
  },

  render: function(){

    return (
            <div>
              <TextField
                ref="course"
                id="new-lecture-course"
                valueLink={this.linkState('course')}
                floatingLabelText="Related Course"
                style={{"width": "95%", "height": "110px"}}
                errorText={this.state.error2Text}
                onChange={this._handleError2InputChange}
                defaultValue="" />
              <TextField
                ref="title"
                id="new-lecture-title"
                valueLink={this.linkState('title')}
                floatingLabelText="Lecture Title"
                style={{"width": "95%", "height": "110px"}}
                errorText={this.state.error2Text}
                onChange={this._handleError2InputChange}
                defaultValue="" />
              <TextField
                ref="desc"
                id="new-lecture-description"
                valueLink={this.linkState('desc')}
                floatingLabelText="Lecture Description"
                multiLine={true}
                style={{"width": "95%", "height": "110px"}}
                errorText={this.state.error2Text}
                onChange={this._handleError2InputChange}
                defaultValue="" />
              <TextField
                ref="url"
                id="new-lecture-url"
                valueLink={this.linkState('url')}
                floatingLabelText="Lecture URL"
                style={{"width": "95%", "height": "110px"}}
                errorText={this.state.error2Text}
                onChange={this._handleError2InputChange}
                defaultValue="" />
            </div>
           );
  }
});

module.exports = ContentForm;