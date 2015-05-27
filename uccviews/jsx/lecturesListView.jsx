var React    = require('react'),
	  $        = require('jquery/dist/jquery.js'),
    TopBar   = require('./template.js'),
    mui = require('material-ui'),
    AppBar = mui.AppBar;

var fakeVideos = [
  {
    url: "https://www.youtube.com/watch?v=Jh0er2pRcq8&list=PLUPi8Qj7uZ3QpsamMg8NvqI9QWv3bK974",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempo"
  },  
  {
    url: "https://www.youtube.com/watch?v=1RMWS60gGUY&list=PLUPi8Qj7uZ3QpsamMg8NvqI9QWv3bK974&index=2",
    description: "ed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium"
  },
  {
    url: "https://www.youtube.com/watch?v=WOVmr6CjgNw&index=3&list=PLUPi8Qj7uZ3QpsamMg8NvqI9QWv3bK974",
    description: "xcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    url: "https://https://www.youtube.com/watch?v=FVdH9YcB3Dg&list=PLUPi8Qj7uZ3QpsamMg8NvqI9QWv3bK974&index=5",
    description: " Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris"
  },
]

// TopBar
var ThemeManager = new mui.Styles.ThemeManager();
ThemeManager.setTheme(ThemeManager.types.LIGHT);


var LecturesList = React.createClass({
	render: function() {
		return (
			 <div>
        <LectureCatalog/>
       </div>
		);
	}
});

var LectureCatalog = React.createClass({
  test: function(){
    console.log('TESTING');
  },
  getContents: function(){
    var that = this;
    console.log('jQuery', $);
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
		return (
			<div>
				<CatalogTitle/>
        <ContentRow/>
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
			<div className="LectureRow"></div>
		);
	}
});

React.render(<LecturesList/>, document.getElementById('react-mount'));

