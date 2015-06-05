var React     = require('react'),
    MaterialMixin     = require('./../../../mixins/material-ui.js'),
    mui       = require('material-ui'),
    TextField = mui.TextField;

var AskQuestionForm = React.createClass({
  mixins: [MaterialMixin],
  componentDidMount: function(){
    $("#question-title").appendTo($("#question-title").parent());
    $("#question-text").parent().appendTo($("#question-text").parent().parent());
  },
  render: function(){
    return (<div>
              <TextField
                id="question-title"
                style={{"width": "80%"}}
                floatingLabelText="What is your question?"/>
              <br />
              <TextField
                id="question-text"
                hintText="Type more details about your question here!"
                multiLine={true}
                style={{"width": "95%"}}/>
            </div>);
  }
});

module.exports = AskQuestionForm;