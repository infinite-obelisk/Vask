var React = require('react'),
    mui = require('material-ui'),
    CircularProgress = mui.CircularProgress;

var ThemeManager = new mui.Styles.ThemeManager();
ThemeManager.setTheme(ThemeManager.types.LIGHT);

var Loader = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function(){
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  render: function() {
    console.log('this.props',this.props);
    if(!this.props.loaded){
      return (
        <div style={{"marginRight": "auto",'position':'relative', 'left':'43%', 'margin-top':'10%'}}>
          <CircularProgress mode="indeterminate" size={1.5}/>
        </div>
      );
    } else {
      return (
        <div>{this.props}</div>
      );
    }

  }
});

module.exports = Loader;