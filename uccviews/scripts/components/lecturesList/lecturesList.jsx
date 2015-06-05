'use strict'

var React             = require('react'),
    lectureActions    = require('../../actions/lectures'),
    lecturesStore     = require('../../stores/lectures'),
    Loader            = require('../loader/loader.jsx'),
    LecturesListTitle = require('./lecturesListTitle.jsx'),
    LectureRow        = require('./lectureRow.jsx'),
    MaterialMixin     = require('../../mixins/material-ui.js');

var LecturesList = React.createClass({
  mixins: [MaterialMixin],

  getInitialState: function(){
    return {
      loaded: false,
      lectures: undefined
    }
  },

  componentDidMount: function(){
    this.setState({
      lectures: lectureActions.getLectures()
    });
    // Add the listener
    lecturesStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function(){
    // Remove the listener
    lecturesStore.removeChangeListener(this._onChange);
  },

  _onChange: function(){
    this.setState({
      loaded: true,
      lectures: lecturesStore.getLectures()
    });
  },


  render: function() {
    console.log('State of the lectures -->', this.state.lectures);
    var rows = [];
    if (this.state.lectures !== undefined) {
      rows = this.state.lectures.map(function(lecture, i){
        return <LectureRow data={lecture} key={i}/>
      });
    }
    return (
      <div>
        <Loader loaded={this.state.loaded}>
          <div className="container">
              <LecturesListTitle/>
              {rows}
          </div>
        </Loader>
      </div>
    );
  }
});

module.exports = LecturesList;