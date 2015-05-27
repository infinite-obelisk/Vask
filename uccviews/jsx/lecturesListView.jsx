var React    = require('react'),
	  $        = require('jquery/dist/jquery.js'),
    TopBar   = require('./template.js'),
    mui      = require('material-ui'),
    AppBar   = mui.AppBar;

var fakeVideos = [
  {
    url: "https://www.youtube.com/watch?v=Jh0er2pRcq8&list=PLUPi8Qj7uZ3QpsamMg8NvqI9QWv3bK974",
    title: "Explore MEAN Stack at 2015",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempo"
  },  
  {
    url: "https://www.youtube.com/watch?v=1RMWS60gGUY&list=PLUPi8Qj7uZ3QpsamMg8NvqI9QWv3bK974&index=2",
    title: "Building high quality services at Uber with Node.js",
    description: "ed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium"
  },
  {
    url: "https://www.youtube.com/watch?v=WOVmr6CjgNw&index=3&list=PLUPi8Qj7uZ3QpsamMg8NvqI9QWv3bK974",
    title: "Comparing Node.js Frameworks: Express, Hapi, LoopBack, Sailsjs and Meteor",
    description: "xcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    url: "https://www.youtube.com/watch?v=FVdH9YcB3Dg&list=PLUPi8Qj7uZ3QpsamMg8NvqI9QWv3bK974&index=5",
    title: "Node.js Fundamentals",
    description: " Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris"
  },
]

// TopBar
var ThemeManager = new mui.Styles.ThemeManager();
ThemeManager.setTheme(ThemeManager.types.LIGHT);


var LecturesList = React.createClass({
  getInitialState: function(){
    return {
      loaded: false,
      content: fakeVideos
    }
  },
  test: function(){
    console.log('TESTING');
  },
  getContents: function(){
    var that = this;
    $.ajax({
      url: "/getquestions",
      method: "GET",
      contentType: "application/json",
      success: function(data){
        console.log( "Data received: ");
        console.dir( data );

        console.log('this',that.test());

      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        console.error("Failed fetching the server");
        throw errorThrown;
      }
    });
  },
  componentWillMount: function(){
    console.log('Fetching contents..');
    this.getContents()
  },  
  render: function() {
    var rows = this.state.content.map(function(content, i){
      return <ContentRow data={content} key={i}/>
    });
		return (
			<div className="container">
				<CatalogTitle/>
        {rows}
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
		return (
      <div>
        <div>{this.props.data.title}</div>
  			<div>{this.props.data.description}</div>
      </div>
		);
	}
});

React.render(<LecturesList/>, document.getElementById('react-mount'));

