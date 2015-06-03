var React     = require('react'),
    mui       = require('material-ui'),
    TextField = mui.TextField;

var AskQuestionForm = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function(){
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  render: function(){
    return (<div>
              <TextField
                floatingLabelText="What is your question?"
                id="question-title"/>
              <br />
              <TextField
                hintText="Type more details about your question here!"
                id="question-text"
                multiLine={true}
                style={{"width": "95%"}}/>
            </div>);
  }
});

module.exports = AskQuestionForm;