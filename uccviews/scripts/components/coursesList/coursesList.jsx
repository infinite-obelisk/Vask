'use strict'

var React             = require('react'),
    courseActions    = require('../../actions/lectures'),
    coursesStore     = require('../../stores/lectures'),
    Loader            = require('../loader/loader.jsx'),
    CoursesListTitle = require('./coursesListTitle.jsx'),
    CourseRow        = require('./courseRow.jsx'),
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
      lectures: courseActions.getLectures()
    });
    // Add the listener
    // We use _ onChange because it's a method
    coursesStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function(){
    // Remove the listener
    coursesStore.removeChangeListener(this._onChange);
  },

  _onChange: function(){
    this.setState({
      loaded: true,
      lectures: coursesStore.getLectures()
    });
  },


  render: function() {
    console.log('State of the lectures -->', this.state.lectures);
    var rows = [];
    if (this.state.lectures !== undefined) {
      rows = this.state.lectures.map(function(lecture, i){
        return <CourseRow data={lecture} key={i}/>
      });
    }
    return (
      <div>
        <Loader loaded={this.state.loaded}>
          <div className="container">
              <CoursesListTitle/>
              {rows}
          </div>
        </Loader>
      </div>
    );
  }
});

module.exports = LecturesList;