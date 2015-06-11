var React = require('react'),
    MaterialMixin = require('./../../../mixins/material-ui.js'),
    mui = require('material-ui'),
    Snackbar = mui.Snackbar;

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
      // console.log('popup is open.. invoking the watcher in 0.5 seconds');
      setTimeout(this.popupWatcher.bind(this), 500);
    }
  },

  checkPlayerStats: function(){
    var state = this.props.getPlayerState();
    if (state === -1) {
      // console.log('player paused');
      return 'paused'
    } else if (state === 1) {
      // console.log('player playing');
      return 'playing'
    } else if (state === 3) {
      // console.log('player buffering');
      return 'buffering'
    }
  },

  checkPopupQuestions: function(){
    var thiz = this;
    var getPlayerCurrentTime = function(){
      return Math.floor(thiz.props.getVideoTime());
    };

    var checkQuestOnThisTime = function(reactScope){
      if(reactScope.state.playerLoaded){
        var currentTime = getPlayerCurrentTime();
        var questions = thiz.props.questions;
        for (var i = 0; i < questions.length; i++) {
          var questionTime = questions[i].time;
          // console.log('questionTime',questionTime);
          // console.log('currentTime',currentTime);
          if (questionTime === currentTime) {
            // checks if the player is playing
            if (reactScope.checkPlayerStats() === 'playing') {
              // check if the popup is opened
              if (!reactScope.state.popupOpened) {
                // console.log('refs Alert', reactScope.refs.alert);
                // update the state of the component (message)
                reactScope.setState({
                  question: questions[i].title,
                  questionId: questions[i]._id,
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
    var thiz = this;
    // check whether the player is loded
    var playerIsLoaded = function(reactScope){
      // checks if the player object is loaded
      if (thiz.props.playerIsLoaded()) {
        // checks if the player API is loaded
        if (thiz.props.getVideoTime() === undefined) {
          // console.log('API is not ready yet');
          // if it's not, try again
          setTimeout(playerIsLoaded.bind(this, reactScope), 500);
        } else {
          // Update the state of the component
          // console.log('readyyy');
          thiz.setState({
            playerLoaded: true,
            playerState: reactScope.checkPlayerStats()
          });
          reactScope.checkPopupQuestions();
          // console.log('STATE UPDATED', reactScope.state);
        }
      } else {
        // if it's not, try again
        // console.log('Failed :( .. No player');
        // console.log('this REACT', this);
        setTimeout(playerIsLoaded.bind(this, reactScope), 1000);
      }
    };
    // console.log('OUTSIDE FUNCTION', this);
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

module.exports = PopupQuestion;