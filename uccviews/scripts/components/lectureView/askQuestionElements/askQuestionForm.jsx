var React     = require('react'),
    MaterialMixin     = require('./../../../mixins/material-ui.js'),
    mui       = require('material-ui'),
    TextField = mui.TextField;

var AskQuestionForm = React.createClass({
  mixins: [MaterialMixin],
  render: function(){
    return (<div>
              <div
                className="question-field">
                  <TextField
                    floatingLabelText="What is your question?"
                    id="question-title"/>
              </div>
              <br />
              <div
                className="text-field">
                  <TextField
                    hintText="Type more details about your question here!"
                    id="question-text"
                    multiLine={true}
                    style={{"width": "95%"}}/>
              </div>
            </div>);
  }
});

module.exports = AskQuestionForm;