var injectTapEventPlugin = require("react-tap-event-plugin");

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

var React = require('react');
var mui = require('material-ui'),
    AppBar = mui.AppBar,
    IconButton = mui.IconButton,
    FontIcon = mui.FontIcon,
    RaisedButton = mui.RaisedButton,
    FlatButton = mui.FlatButton,
    Dialog = mui.Dialog,
    TextField = mui.TextField;
var ThemeManager = new mui.Styles.ThemeManager();
ThemeManager.setTheme(ThemeManager.types.LIGHT);

var getVideoData = function(cb) {
  $.ajax({
          url: "/getquestions?video=test2",
          method: "GET",
          contentType: "application/json",
          statusCode: {
            200: function (data) {
              console.log('win');
              console.log(data);
              var qdata = [];
              window.qObject = {};
              window.videoData = qdata;
              data.result.forEach(function (item) {
                var question = {
                  question : item.title,
                  questionId : item._id,
                  questionUrl : '#',
                  votes : item.votes,
                  answers : item.answers,
                  key : qdata.length + 1
                };
                qdata.push(question);
                window.qObject[item._id] = question;
              })
              cb();
            },
            500: function (err) {
              console.log('lose')
            }
          }
        });
}

var NavBar = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function(){
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  render: function(){
    return (<AppBar
              title="Vask" />);
  }
});

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

var ViewQuestionsListItem = React.createClass({
  openQuestionDialog: function(){
    window.questionDialogs[this.props.questionId].show();
  },
  render: function(){
    return (<div
              className="row">
                <div
                  className="col-lg-1 col-md-1 col-sm-1 col-xs-1 text-center">
                    <Voting
                      votes={this.props.votes}/>
                </div>
                <div
                  className="col-lg-11 col-md-11 col-sm-11 col-xs-11"
                  style={{"paddingTop": "38px"}}>
                    <h4>
                      <a
                        className="question-link"
                        href={this.props.questionUrl}
                        onClick={this.openQuestionDialog}>
                          {this.props.question}
                      </a>
                    </h4>
                </div>
            </div>);
  }
});

var ViewQuestionsList = React.createClass({
  getInitialState: function(){
    return {};
  },
  getQuestionsList: function(){
    this.state.questions = window.videoData;
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
    this.getQuestionsList();
    return (<div>
              {this.state.questions.map(function(question){
                return (<div>
                          <ViewQuestionDialog
                            questionId={question.questionId} />
                          <ViewQuestionsListItem
                            votes={question.votes}
                            question={question.question}
                            questionUrl={question.questionUrl}
                            questionId={question.questionId}
                            key={question.key} />
                        </div>);
              })}
            </div>);
  }
});

var ViewQuestionsDialog = React.createClass({
  openModal: function(){
    this.refs.ViewQuestionsDialog.show();
  },
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function(){
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  closeDialog: function(){
    console.log("Ask Question Dialog Close");
    this.refs.ViewQuestionsDialog.dismiss();
  },
  submitQuestion: function(){
    this.clearForm();
    console.log("Submit Question");
  },
  render: function(){
    var actions = [
      <FlatButton
        key={1}
        label="Close"
        secondary={true}
        onTouchTap={this.closeDialog} />
    ];

    return (<div>
              <Dialog
                ref="ViewQuestionsDialog"
                title="Questions for this lecture"
                actions={actions} >
                  <ViewQuestionsList />
              </Dialog>
              <ViewQuestionsButton
                openModal={this.openModal} />
            </div>);
  }
});

var AskQuestionButton = React.createClass({
  handleButtonClick: function(){
    window.stopVideo.call(window);
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
              label="Ask a Question"
              primary={true}
              style={{"float": "right", "marginLeft": "15px"}} />);
  }
});

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

var AskQuestionDialog = React.createClass({
  openModal: function(){
    this.refs.AskQuestionDialog.show();
  },
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function(){
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  clearForm: function(){
    window.$('#question-title').val("");
    window.$('#question-text').val("");
  },
  closeDialog: function(){
    console.log("Ask Question Dialog Close");
    this.refs.AskQuestionDialog.dismiss();
  },
  submitQuestion: function(){
    console.log("Submit Question");
    var self = this;
    $.ajax({
          url: "/addquestion",
          method: "POST",
          contentType: "application/json",
          data: JSON.stringify({
            video : 'test2',
            text : window.$('#question-text').val(),
            username : 'name',
            time : Math.floor(window.player.getCurrentTime()),
            title : window.$('#question-title').val()
          }),
          statusCode: {
            201: function (data) {
              console.log('win');
              console.log(data);
              self.clearForm();
              self.closeDialog();
            },
            500: function (err) {
              console.log('lose')
            }
          }
        });
  },
  render: function(){
    var actions = [
      <FlatButton
        key={1}
        label="Cancel"
        secondary={true}
        onTouchTap={this.closeDialog} />,
      <FlatButton
        key={2}
        label="Submit"
        primary={true}
        onTouchTap={this.submitQuestion} />
    ];

    return (<div>
              <Dialog
                ref="AskQuestionDialog"
                title="Ask a Question"
                actions={actions} >
                  <AskQuestionForm />
              </Dialog>
              <AskQuestionButton
                openModal={this.openModal} />
            </div>);
  }
});

var ProfilePicture = React.createClass({
  //a sample image url: https://secure.gravatar.com/avatar/?s=100&r=g&d=mm
  render: function(){
    return (<a
              className="media-right profile-picture-container"
              href="#">
                <img
                  className="profile-picture"
                  src={this.props.imgUrl}
                  alt="icon" />
            </a>);
  }
});

var Voting = React.createClass({
  getInitialState: function(){
    return {votes: this.props.votes};
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
    return (<div
              className="media-left voting">
                <IconButton
                  iconClassName="mdi mdi-chevron-up vote-button"
                  tooltip="Vote Up" />
                <p
                  className="votes">
                    <span>{this.state.votes}</span>
                </p>
                <IconButton
                  iconClassName="mdi mdi-chevron-down vote-button"
                  tooltip="Vote Down"/>
            </div>
            );
  }
});

var QuestionEntry = React.createClass({
  render: function(){
    return (<div
              className="col-lg-9 col-md-9 col-sm-9 col-xs-9 question-text">
                <a href="#">
                  <h4
                    className="media-heading user-name">
                      {this.props.user} asks:
                  </h4>
                </a>
                {this.props.question}
                <p>
                  <small>
                    <span
                      className="video-time">
                        Time: {this.props.videoTime}
                    </span>&nbsp;|&nbsp;
                    <span
                      className="question-time">
                         {this.props.questionTime}
                    </span>&nbsp;|&nbsp;
                    <a
                      href="#">
                         Answer
                    </a>
                  </small>
                </p>
            </div>);
  }
});

var Question = React.createClass({
  render: function(){
    return (<div
              className="row question">
              <div
                className="col-lg-3 col-md-3 col-sm-3 col-xs-3 text-center">
                  <Voting
                    votes={this.props.votes} />
                  <ProfilePicture
                    imgUrl={this.props.imgUrl}/>
              </div>
              <QuestionEntry
                user={this.props.user}
                question={this.props.question}
                videoTime={this.props.videoTime}
                questionTime={this.props.questionTime}/>
            </div>);
  }
});

var AnswerEntry = React.createClass({
  render: function(){
    return (<div
              className="col-lg-8 col-md-8 col-sm-8 col-xs-8 answer-text">
                <a
                  href="#">
                    <h4
                      className="media-heading user-name">
                        {this.props.user} replies:
                    </h4>
                </a>
                {this.props.answer}
                <p>
                  <small>
                    <span
                      className="answer-time">
                        {this.props.answerTime}
                    </span>
                  </small>
                </p>
            </div>);
  }
});

var Answer = React.createClass({
  render: function(){
    return (<div
              className="row answer">
                <div
                  className="col-lg-3 col-md-3 col-sm-3 col-xs-3 col-lg-offset-1 col-md-offset-1 col-sm-offset-1 col-xs-offset-1 text-center">
                    <Voting
                      votes={this.props.votes} />
                    <ProfilePicture
                      imgUrl={this.props.imgUrl}/>
                </div>
                <AnswerEntry
                  user={this.props.user}
                  answer={this.props.answer}
                  answerTime={this.props.answerTime}/>
            </div>);
  }
});

var ViewQuestionAndAnswers = React.createClass({
  render: function(){
    return (<div>
              <Question
                votes={this.props.votes}
                imgUrl={this.props.imgUrl}
                user={this.props.user}
                question={this.props.question}
                videoTime={this.props.videoTime}
                questionTime={this.props.questionTime}/>
              {this.props.answers.map(function(answer){
                return (<Answer
                          key={answer.key}
                          votes={answer.votes}
                          imgUrl={answer.imgUrl}
                          user={answer.user}
                          answer={answer.answer}
                          answerTime={answer.answerTime}/>
                        );
              })}
            </div>);
  }
});

var ViewQuestionDialog = React.createClass({
  getInitialState: function(){
    return {};
  },
  getQuestionData: function(){
    this.state.question = window.qObject[this.props.questionId];
  },
  openModal: function(){
    this.refs['ViewQuestionDialog' + this.state.question.questionId].show();
  },
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function(){
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  closeDialog: function(){
    console.log("View Question Dialog Close");
    this.refs['ViewQuestionDialog' + this.state.question.questionId].dismiss();
  },
  render: function(){
    this.getQuestionData();
    var actions = [
      <FlatButton
        key={1}
        label="Close"
        secondary={true}
        onTouchTap={this.closeDialog} />
    ];

    return (<div>
              <Dialog
                ref={"ViewQuestionDialog" + this.state.question.questionId}
                title="Question"
                actions={actions} >
                  <ViewQuestionAndAnswers
                    votes={this.state.question.votes}
                    imgUrl={this.state.question.imgUrl}
                    user={this.state.question.user}
                    question={this.state.question.question}
                    videoTime={this.state.question.videoTime}
                    questionTime={this.state.question.questionTime}
                    answers={this.state.question.answers} />
              </Dialog>
            </div>);
  },
  componentDidMount: function(){
    if(!window.questionDialogs){ window.questionDialogs = {}; }
    window.questionDialogs[this.state.question.questionId] = this.refs["ViewQuestionDialog" + this.state.question.questionId];
  }
});

React.render(<NavBar />,
  document.querySelector('.nav-bar')
);

React.render(<AskQuestionDialog />,
  document.querySelector('.ask-question')
);

getVideoData(function() {
  React.render(<ViewQuestionsDialog />,
    document.querySelector('.view-questions')
  );
});
