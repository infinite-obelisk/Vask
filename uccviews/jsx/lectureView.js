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
    TextField = mui.TextField,
    Snackbar   = mui.Snackbar,
    $          = require('jquery');
var ThemeManager = new mui.Styles.ThemeManager();
ThemeManager.setTheme(ThemeManager.types.LIGHT);



// ==================== Snackbar - PopupQuestion ==================== //
var MaterialMixin = {
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function(){
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }
}

// Snackbar (question alert)
var PopupQuestion = React.createClass({
  mixins: [MaterialMixin],
  getInitialState: function(){
    return {
      playerLoaded: false,
      playerState: undefined,
      popupOpened: false,
      question: false,
      questionId: null
    }
  },
  // If the popup is closed, invoke the the checkPopupQuestions
  // func to display new questions..
  popupWatcher: function(){
    // console.log('watcher loaded');
    if (this.state.playerLoaded && this.state.popupOpened === false) {
      // console.log('check popup questions invoked',this.state.popupOpened);
      this.checkPopupQuestions()
    } else {
      console.log('popup is open.. invoking the watcher in 0.5 seconds');
      setTimeout(this.popupWatcher.bind(this), 500);
    }
  },

  checkPlayerStats: function(){
    if (window.player.getPlayerState() === -1) {
      // console.log('player paused');
      return 'paused'
    } else if (window.player.getPlayerState() === 1) {
      // console.log('player playing');
      return 'playing'
    } else if (window.player.getPlayerState() === 3) {
      // console.log('player buffering');
      return 'buffering'
    }
  },

  checkPopupQuestions: function(){

    var getPlayerCurrentTime = function(){
      return Math.floor(window.player.getCurrentTime());
    };

    var checkQuestOnThisTime = function(reactScope){
      var currentTime = getPlayerCurrentTime();
      var questions = window.qObject;
      if(questions){
        for (var question in questions) {
          var questionTime = window.qObject[question].time;
          // console.log('questionTime',questionTime);
          // console.log('currentTime',currentTime);
          if (questionTime === currentTime) {
            // checks if the player is playing
            if (reactScope.checkPlayerStats() === 'playing') {
              // check if the popup is opened
              if (!reactScope.state.popupOpened) {
                console.log('refs Alert', reactScope.refs.alert);
                // update the state of the component (message)
                reactScope.setState({
                  question: window.qObject[question].question,
                  questionId: question,
                  popupOpened: true
                });
                // show question popup!
                reactScope.refs.alert.show();
                // callback to close the popup and update the state
                var closePopup = function(){
                  // closes the popup
                  this.refs.alert.dismiss();
                  // update the state
                  this.setState({ popupOpened: false });
                  // invoke the watcher to check new questions
                  // console.log('watcher activated', this.state);
                  this.popupWatcher();
                }
                // close the popup after 5 seconds passing the callback
                setTimeout(closePopup.bind(reactScope), 6000);
                // breake the loop
                return;
              }
            }

          }
        };
        // if theres no question at this point, invoke the watcher
        setTimeout(reactScope.popupWatcher.bind(this), 850);

      }
    };

    checkQuestOnThisTime(this);
  },
  componentDidMount: function(){

    // check whether the player is loded
    var playerIsLoaded = function(reactScope){
      // checks if the player object is loaded
      if (window.player) {
        // checks if the player API is loaded
        if (window.player.getCurrentTime === undefined) {
          console.log('API is not ready yet');
          // if it's not, try again
          setTimeout(playerIsLoaded.bind(this, reactScope), 500);
        } else {
          // Update the state of the component
          console.log('readyyy');
          reactScope.setState({
            playerLoaded: true,
            playerState: reactScope.checkPlayerStats()
          });
          reactScope.checkPopupQuestions();
          console.log('STATE UPDATED', reactScope.state);
        }
      } else {
        // if it's not, try again
        console.log('Failed :( .. No player');
        console.log('this REACT', this);
        setTimeout(playerIsLoaded.bind(this, reactScope), 1000);
      }
    };
    console.log('OUTSIDE FUNCTION', this);
    playerIsLoaded(this);


  },
  _handleAction: function(){
    // open the dialog of the current opened message
    window.questionDialogs[this.state.questionId].show();
  },
  render: function() {
    return (
        <Snackbar
          ref="alert"
          message={this.state.question}
          action="Answer it"
          onActionTouchTap={this._handleAction}/>
    );
  }
});



// ================================================================= //
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
    this.props.parentDiagClose();
    window.questionDialogs[this.props.questionId].show();
  },
  render: function(){
    return (<div
              className="row">
                <div
                  className="col-lg-1 col-md-1 col-sm-1 col-xs-1 text-center">
                    <Voting
                      votes={this.props.votes}
                      questionId={this.props.questionId} />
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
    var thiz = this;
    return (<div>
              {this.state.questions.map(function(question){
                return (<div>
                          <ViewQuestionsListItem
                            votes={question.votes}
                            question={question.question}
                            questionUrl={question.questionUrl}
                            questionId={question.questionId}
                            key={question.key}
                            parentDiagClose={thiz.props.parentDiagClose} />
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
              <div
                className="dialog-box">
                  <Dialog
                    ref="ViewQuestionsDialog"
                    title="Questions for this lecture"
                    actions={actions} >
                      <ViewQuestionsList
                        parentDiagClose={this.closeDialog}/>
                  </Dialog>
                  <ViewQuestionsButton
                    openModal={this.openModal} />
              </div>
            </div>);
  }
});

var AllQuestionDialogs = React.createClass({

  getInitialState: function(){
    return {};
  },
  getQuestionsList: function(){
    this.state.questions = window.videoData;
  },
  render: function(){
    this.getQuestionsList();
    return (<div>
              <PopupQuestion />
              {this.state.questions.map(function(question){
                return (<ViewQuestionDialog
                          questionId={question.questionId} />
                        );
              })}
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
    console.log("Time question", Math.floor(window.player.getCurrentTime()));
    addQuestion.bind(this)();
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
  voteUp: function(){
    console.log("vote up");
    var isAnswer = !!this.props.answerIndex;
    var answerIndex = this.props.answerIndex;
    var questionId = this.props.questionId;
    if(isAnswer){
      console.log('vote answer');
      voteQuestion(questionId,1,answerIndex);
    } else {
      console.log('question up vote');
      voteQuestion(questionId,1);
    }
  },
  voteDown: function(){
    console.log("vote down");
    var isAnswer = !!this.props.answerIndex;
    var answerIndex = this.props.answerIndex;
    var questionId = this.props.questionId;
    if(isAnswer){
      console.log('vote answer');
      voteQuestion(questionId,-1,answerIndex);
    } else {
      voteQuestion(questionId,-1);
    }
  },
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
                  tooltip="Vote Up"
                  onClick={this.voteUp} />
                <p
                  className="votes">
                    <span>{this.state.votes}</span>
                </p>
                <IconButton
                  iconClassName="mdi mdi-chevron-down vote-button"
                  tooltip="Vote Down"
                  onClick={this.voteDown} />
            </div>
            );
  }
});

var QuestionEntry = React.createClass({
  render: function(){
    return (<div
              className="col-lg-10 col-md-10 col-sm-10 col-xs-10"
              style={{"paddingTop": "25px"}}>
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
                    </span>
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
                className="col-lg-1 col-md-1 col-sm-1 col-xs-1 text-center">
                  <Voting
                    votes={this.props.votes}
                    questionId={this.props.questionId} />
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
              className="col-lg-11 col-md-11 col-sm-11 col-xs-11 answer-text"
              style={{"paddingTop": "25px"}}>
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
                  className="col-lg-1 col-md-1 col-sm-1 col-xs-1 text-center">
                    <Voting
                      votes={this.props.votes}
                      questionId={this.props.questionId}
                      answerIndex={this.props.answerIndex} />
                </div>
                <AnswerEntry
                  user={this.props.user}
                  answer={this.props.answer}
                  answerTime={this.props.answerTime}/>
            </div>);
  }
});

var AnswerForm = React.createClass({
  submitAnswer: function(){
    //TODO: Submit Answer AJAX
    var answerText = this.refs.answerText.getValue();
    var questionId = this.props.questionId;
    addAnswer(questionId, answerText);

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
    return (<div>
              <TextField
                hintText="Type your answer here..."
                ref="answerText"
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
                    questionId={this.state.question.questionId}
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
  React.render(<AllQuestionDialogs />,
    document.querySelector('.question-dialogs'),
    function(){
      React.render(<ViewQuestionsDialog />,
        document.querySelector('.view-questions')
      );
    }
  );
});
