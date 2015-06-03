'use strict'

var React               = require('react'),
    lectureActions      = require('../../actions/lectures'),
    lecturesStore       = require('../../stores/lectures'),
    askQuestion         = require('./askQuestion.jsx'),
    viewQuestionDialog  = require('./viewQuestionDialog.jsx'),
    viewQuestionsDialog = require('./viewQuestionsDialog.jsx'),
    Loader              = require('../loader/loader.jsx'),
    MaterialMixin       = require('../../mixins/material-ui.js'),
    YouTube             = require('react-youtube');


var LectureView = React.createClass({
  mixins: [MaterialMixin],

  getInitialState: function(){
    return {
      loaded: false
    }
  },

  componentDidMount: function(){
    // Add the listener
    // We use _ onChange because it's a method
    lecturesStore.addChangeListener(this._onChange);
    this.setState({
      questions: lectureActions.getQuestions(this.props.videoId)
    });

    window.player = this.refs.player;
  },

  componentWillUnmount: function(){
    // Remove the listener
    lecturesStore.removeChangeListener(this._onChange);
  },

  _onChange: function(){
    this.setState({
      loaded: true,
      lectures: lecturesStore.getQuestions(this.props.shortUrl)
    });
  },

  onPlayerReady: function(event) {
    event.target.playVideo();
  },

  render: function(){
    console.log('State of the questions -->', this.state.questions);
    return (
      <div
        className="container">
          <Loader loaded={this.state.loaded}>
            <div
              className="row">
                <div
                  className="col-xs-12 col-sm-8 col-md-10 col-lg-10 col-sm-offset-2 col-md-offset-1 col-lg-offset-1">
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
                </div>
            </div>
          </Loader>
      </div>
    );
  }
});

module.exports = LectureView;