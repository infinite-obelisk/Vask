var React    = require('react'),
	  $        = require('jquery/dist/jquery.js'),
    TopBar   = require('./template.js'),
    mui      = require('material-ui'),
    AppBar   = mui.AppBar,
    Loader   = require('./loader.jsx');


// TopBar
var ThemeManager = new mui.Styles.ThemeManager();
ThemeManager.setTheme(ThemeManager.types.LIGHT);


var LecturesList = React.createClass({
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
    var that = this;
    $.ajax({
      url: this.props.source,
      method: "GET",
      contentType: "application/json",
      success: function(data){
        console.log( "Data received: " + data);
        setInterval(function(){
          that.setState({
            loaded: true,
            content: data.result
          });  
        }, 2000);
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
      <Loader loaded={this.state.loaded}>
        <div className="container">
          
            <CatalogTitle/>
            {rows}
          
        </div>
      </Loader>
      
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
    return (
      <div className="contentBox row">
        <hr/>
        <div className="col-lg-3 col-md-4 col-sm-5">
          <img className="ct-thumb thumbnail" src="https://i3.ytimg.com/vi/t7eyMwlgOI0/mqdefault.jpg"/>
        </div>
        
        <div className="col-lg-9 col-md-8 col-sm-7">
          <div className="ct-title">{this.props.data.title}</div>
          <div className="ct-subtitle">{this.props.data.subtitle}</div>
          <div className="ct-description">{this.props.data.description}</div>
        </div>
      </div>
    );
  }
});

React.render(<LecturesList/>, document.getElementById('react-mount'));

