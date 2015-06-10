'use strict'

var React           = require('react');
var LectureView     = require('./lectureView.jsx');
var mui             = require('material-ui');
var MaterialMixin   = require('../../mixins/material-ui.js');

var LectureViewCtrl = React.createClass({
  mixins: [MaterialMixin],
  render: function() {
    console.log('LectureCtrl', this.props);
    return (
      <div>
        <div className="container-fluid">
          <div className="col-lg-7">
            <LectureView shortUrl={this.props.shortUrl}/>
          </div>
          <div className="col-lg-5">
            <Playlist related={this.state.playlist}/>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = LectureViewCtrl;