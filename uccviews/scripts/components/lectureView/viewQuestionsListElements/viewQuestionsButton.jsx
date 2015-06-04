var React = require('react'),
    MaterialMixin = require('./../../../mixins/material-ui.js'),
    mui = require('material-ui'),
    RaisedButton = mui.RaisedButton;

var ViewQuestionsButton = React.createClass({
  mixins: [MaterialMixin],
  handleButtonClick: function(){
    this.props.openModal();
  },
  render: function(){
    return (<RaisedButton
              onTouchTap={this.handleButtonClick}
              label="View all Questions"
              secondary={true}
              style={{"float": "right", "marginLeft": "15px"}} />);
  }
});

module.exports = ViewQuestionsButton;