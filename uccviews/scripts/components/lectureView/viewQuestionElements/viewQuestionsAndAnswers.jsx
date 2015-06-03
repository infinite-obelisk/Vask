var React = require('react'),
    Question = require('./../QAElements/question.jsx'),
    AnswerForm = require('./answerForm.jsx'),
    Answer = require('./../QAElements/answer.jsx');

var ViewQuestionAndAnswers = React.createClass({
  render: function(){
    return (<div>
              <Question
                votes={this.props.votes}
                imgUrl={this.props.imgUrl}
                user={this.props.user}
                question={this.props.question}
                videoTime={this.props.videoTime}
                questionTime={this.props.questionTime}
                questionId={this.props.questionId}/>
              <AnswerForm
                questionId={this.props.questionId}/>
              {this.props.answers.map(function(answer, index){
                return (<Answer
                          key={answer.key}
                          votes={answer.votes}
                          imgUrl={answer.imgUrl}
                          user={answer.user || "Anonymous"}
                          answer={answer.text}
                          answerTime={answer.answerTime}
                          answerIndex={index}
                          questionId={answer.questionId}/>
                        );
              })}
            </div>);
  }
});

module.exports = ViewQuestionAndAnswers;