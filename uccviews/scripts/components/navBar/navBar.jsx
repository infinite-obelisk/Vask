var React    = require('react'),
    mui      = require('material-ui'),
    AppBar   = mui.AppBar,
    LeftNav  = mui.LeftNav,
    MenuItem = mui.MenuItem,
    MaterialMixin = require('../../mixins/material-ui.js'),
    HeaderLeftMenu = require('../navBar/headerLeftMenu.jsx'),
    injectTapEventPlugin = require("react-tap-event-plugin");

    injectTapEventPlugin();


var menuItems = [
{ type: MenuItem.Types.SUBHEADER, text: 'Navigate' },
  {
    type: MenuItem.Types.LINK,
    payload: '/courses',
    text: 'Courses'
  },  
  {
    type: MenuItem.Types.LINK,
    payload: '/lessons',
    text: 'Lessons'
  },
  // { route: '/profile', text: 'Profile' },
  // { route: '/search', text: 'Find a Course/Video' },
  { type: MenuItem.Types.SUBHEADER, text: 'Create' },
  { 
     type: MenuItem.Types.LINK, 
     payload: '/courses/create', 
     text: 'Create a course' 
  },  
  { 
     type: MenuItem.Types.LINK, 
     payload: '/lessons/add', 
     text: 'Add a new lesson' 
  },
  // { 
  //    text: 'Disabled', 
  //    disabled: true 
  // },

];



var NavBar = React.createClass({
  
  mixins: [MaterialMixin],

  componentDidMount: function() {

  },
  _handleClick: function(){
    console.log('nav bar clicked');
    this.refs.leftNav.toggle();
  },
  render: function(){
    return (
      <div>
        <LeftNav 
          ref="leftNav" 
          menuItems={menuItems} 
          docked={false}
          selectedIndex={3} 
          header={<HeaderLeftMenu/>}/>
        <div>
          <AppBar onLeftIconButtonTouchTap={this._handleClick} title="Vask" ref="topBar" />
        </div>
      </div>
    );
  }
});

module.exports = NavBar;
