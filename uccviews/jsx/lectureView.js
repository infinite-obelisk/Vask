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
    FontIcon = mui.FontIcon;
var ThemeManager = new mui.Styles.ThemeManager();
ThemeManager.setTheme(ThemeManager.types.LIGHT);

var NavBar = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext:function() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    }
  },
  render: function(){
    return (<AppBar title="Vask" />);
  }
});

var ProfilePicture = React.createClass({
  //a sample image url: https://secure.gravatar.com/avatar/?s=100&r=g&d=mm
  render: function(){
    return (<a className="media-right profile-picture-container" href="#">
              <img className="profile-picture" src={this.props.imgUrl} alt="icon" />
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
  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    }
  },
  render: function(){
    return (<div className="media-left voting">
              <IconButton iconClassName="mdi mdi-chevron-up vote-button" tooltip="Vote Up"/>
              <p className="votes"><span>{this.state.votes}</span></p>
              <IconButton iconClassName="mdi mdi-chevron-down vote-button" tooltip="Vote Down"/>
            </div>
            );
  }
});

var QuestionEntry = React.createClass({
  render: function(){
    return (<div className="col-lg-10 col-md-10 col-sm-10 col-xs-10 question-text">
              <a href="#"><h4 className="media-heading user-name">{this.props.user} asks:</h4></a>
              {this.props.question}
              <p><small><span className="video-time">Time: {this.props.videoTime}</span> | <span className="question-time">{this.props.questionTime} | </span><a href="#">Answer</a></small></p>
            </div>);
  }
});

var Question = React.createClass({
  render: function(){
    return (<div className="row question">
              <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
                <Voting votes={this.props.votes} />
                <ProfilePicture imgUrl={this.props.imgUrl}/>
              </div>
              <QuestionEntry user={this.props.user} question={this.props.question} videoTime={this.props.videoTime} questionTime={this.props.questionTime}/>
            </div>);
  }
});

var AnswerEntry = React.createClass({
  render: function(){
    return (<div className="col-lg-9 col-md-9 col-sm-9 col-xs-9 answer-text">
              <a href="#"><h4 className="media-heading user-name">{this.props.user} replies:</h4></a>
              {this.props.answer}
              <p><small><span className="answer-time">{this.props.answerTime}</span></small></p>
            </div>);
  }
});

var Answer = React.createClass({
  render: function(){
    return (<div className="row answer">
              <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 col-lg-offset-1 col-md-offset-1 col-sm-offset-1 col-xs-offset-1 text-center">
                <Voting votes={this.props.votes} />
                <ProfilePicture imgUrl={this.props.imgUrl}/>
              </div>
              <AnswerEntry user={this.props.user} answer={this.props.answer} answerTime={this.props.answerTime}/>
            </div>);
  }
});

React.render(<NavBar />,
  document.querySelector('.nav-bar')
);

React.render(<Question votes="5" imgUrl="https://secure.gravatar.com/avatar/?s=100&r=g&d=mm" user="Anonymous" question="Can somebody explain the significant of Oxygen to me?" videoTime="3:42" questionTime="1 day ago"/>,
  document.querySelector('.question-entry')
);

React.render(<Answer votes="3" imgUrl="https://secure.gravatar.com/avatar/?s=100&r=g&d=mm" user="Anonymous" answer="You need oxygen to survive." answerTime="12 hours ago"/>,
  document.querySelector('.answer-entry')
);