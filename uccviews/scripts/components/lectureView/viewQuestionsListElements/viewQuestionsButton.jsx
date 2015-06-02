var React = require('react'),
    mui = require('material-ui'),
    RaisedButton = mui.RaisedButton;

var ViewQuestionsButton = React.createClass({
  handleButtonClick: function(){
    this.props.openModal();
  },
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function(){
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
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