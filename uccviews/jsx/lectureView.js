var injectTapEventPlugin = require("react-tap-event-plugin");

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

var React = require('react');
var mui = require('material-ui'),
    Toolbar = mui.Toolbar,
    ToolbarGroup = mui.ToolbarGroup,
    FontIcon = mui.FontIcon;

var permanentsrc = "eyU3bRy2x44";

var YoutubeVideo = React.createClass(
{
  render: function(){
    return <iframe id="youtube" width="560" height="315" src={"https://www.youtube.com/embed/" + this.props.ytsrc} frameborder="0" allowfullscreen></iframe>;
  }
});

var NavBar = React.createClass({
  render: function(){
    return (<Toolbar>
              <ToolbarGroup float="left">
                <FontIcon className="mdi mdi-menu"/>
              </ToolbarGroup>
              <ToolbarGroup float="right">
                <FontIcon className="mdi mdi-logout"/>
              </ToolbarGroup>
            </Toolbar>);
  }
});

React.render(<NavBar />,
  document.querySelector('.nav-bar')
);

React.render(<YoutubeVideo ytsrc = {permanentsrc} />,
  document.querySelector('.youtube-video')
);