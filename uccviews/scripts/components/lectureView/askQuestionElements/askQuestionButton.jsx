var React                = require('react'),
    injectTapEventPlugin = require("react-tap-event-plugin");
    MaterialMixin        = require('./../../../mixins/material-ui.js'),
    mui                  = require('material-ui'),
    RaisedButton         = mui.RaisedButton;

injectTapEventPlugin();

var AskQuestionButton = React.createClass({
  mixins: [MaterialMixin],
  handleButtonClick: function(){
    this.props.stopVideo();
    this.props.openModal();
  },
  render: function(){
    return (<RaisedButton
              onTouchTap={this.handleButtonClick}
              label="Ask a Question"
              primary={true}
              style={{"float": "right", "marginLeft": "15px"}} />);
  }
});

module.exports = AskQuestionButton;