var injectTapEventPlugin = require("react-tap-event-plugin");

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

var React = require('react');
var mui = require('material-ui'),
    AppBar = mui.AppBar,
    FontIcon = mui.FontIcon;

var permanentsrc = "eyU3bRy2x44";
var ThemeManager = new mui.Styles.ThemeManager();
ThemeManager.setTheme(ThemeManager.types.LIGHT);

var NavBar = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext:function() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    }
  },
  render: function(){
    return (<AppBar title="Vask" />);
  }
});

var YoutubeVideo = React.createClass({
  render: function(){
    return <iframe id="youtube" width="560" height="315" src={"https://www.youtube.com/embed/" + this.props.ytsrc} frameborder="0" allowfullscreen></iframe>;
  }
});

var QuestionEntry = React.createClass({
  render: function(){
    return <div></div>
  }
});

React.render(<NavBar />,
  document.querySelector('.nav-bar')
);

React.render(<YoutubeVideo ytsrc = {permanentsrc} />,
  document.querySelector('.youtube-video')
);