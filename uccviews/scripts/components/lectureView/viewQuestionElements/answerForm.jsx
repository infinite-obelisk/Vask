var React = require('react'),
    MaterialMixin = require('./../../../mixins/material-ui.js'),
    mui = require('material-ui'),
    TextField = mui.TextField,
    FlatButton = mui.FlatButton;

var AnswerForm = React.createClass({
  mixins: [MaterialMixin],
  componentDidMount: function(){
    $(".answer-form>div>textarea").parent().appendTo($(".answer-form"));
  },
  addAnswer: function (questionId, answerText) {
    $.ajax({
      url: "/addanswer",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({
        text : answerText,
        _id : questionId
      }),
      statusCode: {
        201: function (data) {
          console.log('win');
          console.log(data);
          //self.clearForm();
          //self.closeDialog();
        },
        500: function (err) {
          console.log('lose')
        }
      }
    });
  },
  submitAnswer: function(){
    var answerText = this.refs.answerText.getValue();
    var questionId = this.props.questionId;
    this.addAnswer(questionId, answerText);
    $(".answer-form>div>textarea").val("");
  },
  render: function(){
    return (<div>
              <TextField
                hintText="Type your answer here..."
                ref="answerText"
                className="answer-form"
                multiLine={true}
                style={{"width": "95%"}}/>
              <FlatButton
                label="Submit"
                style={{"float": "right"}}
                onClick={this.submitAnswer}/>
              <div
                style={{"clear": "both"}}>
              </div>
            </div>);
  }
});

module.exports = AnswerForm;