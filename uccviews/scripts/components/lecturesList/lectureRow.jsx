'use strict'

var React = require('react');

var ContentRow = React.createClass({
  render: function() {
    console.log('ROW DATA',this.props.data.shortUrl);
    var link = "/lectures/" + this.props.data.shortUrl;
    
    return (
      <div className="contentBox row">
          <hr/>
          <div className="col-lg-2 col-md-3 col-sm-4">
            <img className="ct-thumb thumbnail" src="https://i3.ytimg.com/vi/t7eyMwlgOI0/mqdefault.jpg"/>
          </div>
          <div className="col-lg-7 col-md-5">
            <div className="ct-title">
              <svg className="title-icon" style={{"width":"24px","height":"24px"}} viewBox="0 0 24 24">
                  <path fill="#dc0e3b" d="M10,16.5V7.5L16,12M20,4.4C19.4,4.2 15.7,4 12,4C8.3,4 4.6,4.19 4,4.38C2.44,4.9 2,8.4 2,12C2,15.59 2.44,19.1 4,19.61C4.6,19.81 8.3,20 12,20C15.7,20 19.4,19.81 20,19.61C21.56,19.1 22,15.59 22,12C22,8.4 21.56,4.91 20,4.4Z" />
              </svg>
              <a href={link}>{this.props.data.title}</a>
            </div>
            <div className="ct-subtitle">{this.props.data.subtitle}</div>
            <div className="ct-description">{this.props.data.description}</div>
          </div>
          <div className="col-lg-2 col-md-3 col-sm-4 ct-stats">
            <div className="row">
              <div className="col-sm-6 col-xs-6 text-center ct-stats-box1">
                <svg style={{"width":"42px","height":"42px"}} viewBox="0 0 24 24">
                  <path fill="#0099DD" d="M20,2A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H6L2,22V4C2,2.89 2.9,2 4,2H20M5,5V7H19V5H5M5,9V11H13V9H5M5,13V15H15V13H5Z" />
                </svg>
                <p>35</p>
              </div>
              <div className="col-sm-6 col-xs-6 text-center ct-stats-box2">
                <svg style={{"width":"50px","height":"50px"}} viewBox="0 0 24 24">
                    <path fill="#0099DD" d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
                </svg>
                <p>35</p>
              </div>
            </div>
          </div>
      </div>

    );
  }
});

module.exports = ContentRow;