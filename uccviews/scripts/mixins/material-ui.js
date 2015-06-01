'use strict'

var React = require('react'),
	mui   = require('material-ui');

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

module.exports = MaterialMixin;