var React    = require('react'),
	  $        = require('jquery/dist/jquery.js'),
    TopBar   = require('./template.js'),
    mui      = require('material-ui'),
    AppBar   = mui.AppBar,
    Snackbar   = mui.Snackbar,
    Loader   = require('./loader.jsx');


// TopBar
var ThemeManager = new mui.Styles.ThemeManager();
ThemeManager.setTheme(ThemeManager.types.LIGHT);

var MaterialMixin = {
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function(){
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }
}


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

var CatalogTitle = React.createClass({
  render: function() {
    return (
      <div>
        <h3>List of Contents</h3>
      </div>
    );
  }
});

var ContentRow = React.createClass({
  render: function() {
    console.log(this.props.data._id);
    var link = "/lectures/" + this.props.data._id;

    return (
      <div className="contentBox row">
        <hr/>
        <div className="col-lg-3 col-md-4 col-sm-5">
          <img className="ct-thumb thumbnail" src="https://i3.ytimg.com/vi/t7eyMwlgOI0/mqdefault.jpg"/>
        </div>
        
        <div className="col-lg-9 col-md-8 col-sm-7">
          <div className="ct-title"><a href={link}>{this.props.data.title}</a></div>
          <div className="ct-subtitle">{this.props.data.subtitle}</div>
          <div className="ct-description">{this.props.data.description}</div>
        </div>
      </div>
    );
  }
});

module.exports = LecturesList;

