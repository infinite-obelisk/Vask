'use strict'

var React         = require('react'),
	mui           = require('material-ui'),
	RaisedButton  = mui.RaisedButton,
	AddContent    = require('./addContent.jsx'),
	MaterialMixin = require('../../mixins/material-ui.js');

var LectureListTitle = React.createClass({

  mixins: [MaterialMixin],

	render: function() {
		return (
		  <div className="lectureTitleBox row">
		  	<div className="col-lg-6 col-md-6 col-sm-6">
		  	  <h3>Courses</h3>
		  	</div>
		  	
		  	<div className="col-lg-6 col-md-6 col-sm-6" style={{"paddingTop": "10px"}}>
		  	  <AddContent/>
		  	</div>
		  </div>
		);
	}
});

module.exports = LectureListTitle;