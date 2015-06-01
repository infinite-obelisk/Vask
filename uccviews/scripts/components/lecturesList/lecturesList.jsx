'use strict'

var React = require('react');

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
      loaded: false,
      content: []
    }
  },
  componentDidMount: function(){

    console.log('Fetching contents..');
    console.log('SNACKBAR', this.refs.alert);
    var that = this;
    $.ajax({
      url: this.props.source,
      method: "GET",
      contentType: "application/json",
      success: function(data){
        console.log( "Data received: " + data);
        setTimeout(function(){
          that.setState({
            loaded: true,
            content: data.result
          });  
        }, 1000);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        console.error("Failed fetching the server");
        throw errorThrown;
      }
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