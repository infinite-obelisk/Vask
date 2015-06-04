'use strict'

var React             = require('react'),
    mui               = require('material-ui'),
    CircularProgress  = mui.CircularProgress,
    MaterialMixin     = require('../../mixins/material-ui.js');

var Loader = React.createClass({
  mixins: [MaterialMixin],

  render: function() {
    // console.log('this.props',this.props);
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