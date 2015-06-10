'use strict'

var React               = require('react'),
    lectureActions      = require('../../actions/lectures'),
    questionsActions    = require('../../actions/questions'),
    lecturesStore       = require('../../stores/lectures'),
    questionsStore      = require('../../stores/questions'),
    AskQuestionDialog   = require('./askQuestionDialog.jsx'),
    PopupQuestion       = require('./viewQuestionElements/popupQuestion.jsx'),
    ViewQuestionDialog  = require('./viewQuestionDialog.jsx'),
    ViewQuestionsDialog = require('./viewQuestionsDialog.jsx'),
    Loader              = require('../loader/loader.jsx'),
    MaterialMixin       = require('../../mixins/material-ui.js'),
    YouTube             = require('react-youtube'),
    Playlist            = require('./playlistBox/playlistBox.jsx');


var LectureView = React.createClass({
  mixins: [MaterialMixin],

  getInitialState: function(){
    return {
      loaded: false
    };
  },

  componentDidMount: function(){
    // Add the listener
    // We use _ onChange because it's a method
    questionsStore.addChangeListener(this._onChange);
    lectureActions.getPlaylist(this.props.shortUrl);
    lectureActions.getLectureInfo(this.props.shortUrl);
    this.setState({
      questions: questionsActions.getQuestions(this.props.shortUrl)
    });

    window.player = this.refs.player;


  },

  componentWillUnmount: function(){
    // Remove the listener
    questionsStore.removeChangeListener(this._onChange);
  },

  _onChange: function(){
    var lectureInfo = lecturesStore.getLectureInfo();
    this.setState({
      loaded: true,
      questions: questionsStore.getQuestions(),
      playlist: lecturesStore.getPlaylist(),
      progress: lecturesStore.getPlaylistProgress(),
      title: lectureInfo ? lectureInfo.title : null
    });
    console.log('****State update after the playlist!', this.state);
  },

  onPlayerReady: function(event){
    event.target.playVideo();
  },

  stopVideo: function(){
    this.refs.player._internalPlayer.stopVideo();
  },

  getVideoTime: function(){
    if(this.refs.player._internalPlayer && this.refs.player._internalPlayer.getCurrentTime){
      return this.refs.player._internalPlayer.getCurrentTime();
    }
  },

  getPlayerState: function(){
    if(this.refs.player._internalPlayer){
      return this.refs.player._internalPlayer.getPlayerState();
    } else {
      return false;
    }
  },

  playerIsLoaded: function(){
    return !!this.refs.player;
  },

  render: function(){
    console.log('State of the questions -->', this.state);
    var questions;
    var thiz = this;
    if(!!this.state.questions){
      questions = (<div>
                    <PopupQuestion
                      getPlayerState={this.getPlayerState}
                      getVideoTime={this.getVideoTime}
                      playerIsLoaded={this.playerIsLoaded}
                      questions={this.state.questions} />
                    {this.state.questions.map(function(question){
                      return (<ViewQuestionDialog
                                question={question}
                                shortUrl={thiz.props.shortUrl}/>);
                    })}
                    </div>);
    }
    return (
      <div
        className="container-fluid">
          <Loader loaded={this.state.loaded}>
            <div className="row">
              <div className="col-lg-8">
                <div className="lectureTitle"><h2>{this.state.title}</h2></div>
                <div className="box-player">
                  <div
                    className="row">
                      <div
                        className="col-lg-12 player-container">
                          <div
                            className="ytcont">
                              <div
                                className="player">
                                  <YouTube
                                    url={'http://www.youtube.com/watch?v=' + this.props.shortUrl}
                                    id="player"
                                    ref="player"
                                    onReady={this.onPlayerReady} />
                              </div>
                          </div>
                          <div
                            className="row">
                              <div className="col-lg-12 bt-player-ctrls">
                                <AskQuestionDialog
                                  stopVideo={this.stopVideo}
                                  getVideoTime={this.getVideoTime}
                                  videoId = {this.props.shortUrl}/>
                                {questions}
                                <ViewQuestionsDialog
                                  questions={this.state.questions}/>
                              </div>
                          </div>
                      </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <Playlist
                    related={this.state.playlist}
                    progress={this.state.progress}
                    playingNow={this.props.shortUrl}/>
              </div>
            </div>
          </Loader>
      </div>
    );
  }
});

module.exports = LectureView;