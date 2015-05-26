var injectTapEventPlugin = require("react-tap-event-plugin");

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

var React = require('react'),
    mui = require('material-ui'),
    // YOU MUST ADD EACH MATERIAL UI COMPONENT BEFORE USE, AS SEEN BELOW:
    AppBar = mui.AppBar;

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

// CUSTOM HTML W/O MATERIAL UI ELEMENTS
// ----------------------
// var Example = React.createClass({
//   render: function(){
//     return (YOUR_HTML_HERE);
//   }
// });

// CUSTOM HTML WITH MATERIAL UI ELEMENTS
// ----------------------
// var Example = React.createClass({
//   getInitialState: function(){
//     return {votes: this.props.votes};
//   },
//   childContextTypes: {
//     muiTheme: React.PropTypes.object
//   },
//   getChildContext: function() {
//     return {
//       muiTheme: ThemeManager.getCurrentTheme()
//     }
//   },
//   render: function(){
//     return (YOUR_HTML_HERE);
//   }
// });

React.render(<NavBar />,
  document.querySelector('.nav-bar')
);