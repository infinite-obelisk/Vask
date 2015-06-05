'use strict'

var React         = require('react'),
	mui           = require('material-ui'),
	RaisedButton  = mui.RaisedButton,
	AddLecture    = require('./addLecture.jsx'),
	MaterialMixin = require('../../mixins/material-ui.js');

var LectureListTitle = React.createClass({

  mixins: [MaterialMixin],

	render: function() {
		return (
		  <div className="lectureTitleBox row">
		  	<div className="col-lg-6 col-md-6 col-sm-6">
		  	  <h3>Lectures</h3>
		  	</div>
		  	
		  	<div className="col-lg-6 col-md-6 col-sm-6" style={{"paddingTop": "10px"}}>
		  	  <AddLecture />
		  	</div>
		  </div>
		);
	}
});

module.exports = LectureListTitle;