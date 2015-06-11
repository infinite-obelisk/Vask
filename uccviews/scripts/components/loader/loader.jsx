'use strict'

var React             = require('react'),
    mui               = require('material-ui'),
    CircularProgress  = mui.CircularProgress,
    MaterialMixin     = require('../../mixins/material-ui.js');

var Loader = React.createClass({
  mixins: [MaterialMixin],

  getInitialState: function(){
    return {
      loaded: false
    }
  },

  componentWillReceiveProps: function(nextProps) {
    // console.log('Loader... NextProps',nextProps);
    this.setState({
      loaded: nextProps.loaded
    });
  },

  render: function() {
    // console.log('Loader State --> this.state',this.state);
    if(!this.props.loaded){
      return (
        <div style={{"marginRight": "auto",'position':'relative', 'left':'43%', 'marginTop':'10%'}}>
          <CircularProgress mode="indeterminate" size={1.5}/>
        </div>
      );
    } else {
      // console.log('Rendering the content from the loader');
      return (
        <div>
          {this.props}
        </div>
      );
    }

  }
});

module.exports = Loader;