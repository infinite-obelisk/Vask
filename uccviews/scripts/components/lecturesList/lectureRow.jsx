'use strict'

var React = require('react');

var ContentRow = React.createClass({
  render: function() {
    console.log('ROW DATA',this.props.data.shortUrl);
    var link = "/lectures/" + this.props.data.shortUrl;
    
    return (
      <div className="contentBox row">
        <hr/>
        <div className="col-lg-3 col-md-4 col-sm-5">
          <img className="ct-thumb thumbnail" src="https://i3.ytimg.com/vi/t7eyMwlgOI0/mqdefault.jpg"/>
        </div>
        
        <div className="col-lg-9 col-md-8 col-sm-7">
          <div className="ct-title"><a href={link}>{this.props.data.title}</a></div>
          <div className="ct-subtitle">{this.props.data.subtitle}</div>
          <div className="ct-description">{this.props.data.description}</div>
        </div>
      </div>
    );
  }
});

module.exports = ContentRow;