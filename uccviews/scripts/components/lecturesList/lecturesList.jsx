'use strict'

var React = require('react'),
    lectureActions = require('../actions/lectures'),
    lecturesStore = require('../stores/lectures');

var LecturesList = React.createClass({
  mixins: [MaterialMixin],
  //Somewhere in our code
  _handleAction: function() {
    //We can add more code to this function, but for now we'll just include an alert.
    alert("We removed the event from your calendar.");
  },
  showSnackbar: function(){
    console.log('Show the f***** snackbar, HAHAHHA');
    // console.dir(Snackbar);
    // Snackbar.show();
  },

  getDefaultProps: function(){
    return {
      source: '/getlectures'
    }
  },

  getInitialState: function(){
    return {
      lectures: lectureActions.getLectures()
    }
  },

  componentDidMount: function(){
    // Add the listener
    // We use _ onChange because it's a method
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
    var rows = this.state.content.map(function(content, i){
      return <ContentRow data={content} key={i}/>
    });
    return (
      <div>
        <Snackbar
          ref="alert"
          message="Event added to your calendar"
          action="undo"
          openOnMount="true"
          onActionTouchTap={this._handleAction}/>

        <Loader loaded={this.state.loaded}>
          <div className="container">
              <CatalogTitle/>
              {rows}
          </div>
        </Loader>
      </div>
    );
  }
});

module.exports = LecturesList;