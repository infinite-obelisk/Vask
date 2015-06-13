'use strict'

var React               = require('react'),
    lectureActions      = require('../../actions/lectures'),
    questionsActions    = require('../../actions/questions'),
    lecturesStore       = require('../../stores/lectures'),
    AskQuestionDialog   = require('./askQuestionDialog.jsx'),
    PopupQuestion       = require('./viewQuestionElements/popupQuestion.jsx'),
    ViewQuestionsDialog = require('./viewQuestionsDialog.jsx'),
    AllQuestionsDialogs = require('./allQuestionsDialogs.jsx'),
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
    lecturesStore.addChangeListener(this._onChange);

    lectureActions.getPlaylist(this.props.shortUrl);
    lectureActions.getLectureInfo(this.props.shortUrl);
    questions: questionsActions.getQuestions(this.props.shortUrl);

    window.player = this.refs.player;


  },

  componentWillUnmount: function(){
    // Remove the listener
    lecturesStore.removeChangeListener(this._onChange);
  },

  _onChange: function(){
    // console.log('Onnn changeeeee...');
    var lectureInfo = lecturesStore.getLectureInfo(),
        playlistStatus = lecturesStore.getPlaylist(),
        progressStatus = lecturesStore.getPlaylistProgress(),
        questionStatus = lecturesStore.getQuestions(),
        loaded = false;

    if (playlistStatus !== undefined & questionStatus !== undefined) {
      loaded = true;
    }
    // console.log('playlistStatus',playlistStatus);
    // console.log('progressStatus',progressStatus);
    // console.log('questionStatus',questionStatus);
    // console.log('loaded',loaded);
    this.setState({
      loaded: loaded,
      playlist: lecturesStore.getPlaylist(),
      progress: lecturesStore.getPlaylistProgress(),
      title: lectureInfo.title,
      headerTitle: lectureInfo.course,
      questions: questionStatus
    });
    // console.log('****State update after the playlist!', this.state);
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
    // console.log('PLAYLIST STATES -->', this.state.playlist);
    // console.log('PLAYLIST STATES BOOLEAN-->', !!this.state.playlist);
    // console.log('PLAYLIST STATES -->', this.state.progress);
    // console.log('PLAYLIST STATES -->', this.props.shortUrl);

    var questions;
    var thiz = this;
    return (
      <div
        className="container-fluid">
          <Loader loaded={this.state.loaded}>
            <PopupQuestion
              getPlayerState={this.getPlayerState}
              getVideoTime={this.getVideoTime}
              playerIsLoaded={this.playerIsLoaded}
              questions={this.state.questions} />
            <h2 className="header-title">{this.state.headerTitle}</h2>
            <div className="row">
              <div className="col-lg-8">
                <div className="lectureTitle">
                  <h2
                    style={{"fontFamily": '"Helvetica Neue",Helvetica,Arial,sans-serif'}}>
                      {this.state.title}
                  </h2>
                </div>
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
                                <AllQuestionsDialogs
                                  shortUrl={this.props.shortUrl} />
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