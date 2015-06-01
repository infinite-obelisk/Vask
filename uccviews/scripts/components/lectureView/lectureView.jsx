'use strict'

var React             = require('react'),
    lectureActions    = require('../../actions/lectures'),
    lecturesStore     = require('../../stores/lectures'),
    askQuestion       = require('./askQuestion.jsx'),
    viewQuestion      = require('./viewQuestion.jsx'),
    viewAllQuestions  = require('./viewAllQuestions.jsx'),
    Loader            = require('../loader/loader.jsx'),
    MaterialMixin     = require('../../mixins/material-ui.js');


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
      questions: lectureActions.getQuestions(this.props.videoId);
    });
  },

  componentWillUnmount: function(){
    // Remove the listener
    lecturesStore.removeChangeListener(this._onChange);
  },

  _onChange: function(){
    this.setState({
      loaded: true,
      lectures: lecturesStore.getQuestions()
    });
  },

  render: function(){
    console.log('State of the questions -->', this.state.questions);
    return (
      <div>
        <Loader loaded={this.state.loaded}>
          <div className="container">
              <h1>Something</h1>
          </div>
        </Loader>
      </div>
    );
  }
});

module.exports = LectureView;