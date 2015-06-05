'use strict'

var React           = require('react'),
	mui               = require('material-ui'),
	RaisedButton      = mui.RaisedButton,
	AddLecture        = require('./addLecture.jsx'),
	MaterialMixin     = require('../../mixins/material-ui.js'),
	TextField         = mui.TextField,
	lectureActions    = require('../../actions/lectures');

var LectureListTitle = React.createClass({

	mixins: [MaterialMixin, React.addons.LinkedStateMixin],

	getInitialState: function(){
		return {
			search: ''
		}
	},

	componentDidMount: function(){
		var self = this;
		$('#searchBar').on('keyup', function(e){
			// Catch the query value
			var searchVal = '?search=' + self.state.search;
			
			// if ESC key is pressed, clean the input
			if(e.keyCode === 27) {
				self.setState({
					search: ''
				});
			} else {
				// make the request every time a character is pressed
				lectureActions.getLectures(searchVal);
			}
			
		});
	},

	render: function() {
		return (
		  <div className="row lectureTitleBox">
		    <div className="col-lg-3">
		      <h3>Lectures</h3>
		    </div>
		    <div className="col-lg-6 searchBar">
		      <div className="icon-search-box">
		        <svg style={{"width":"29px","height":"29px"}} className="icon-search" viewBox="0 0 24 24">
		            <path fill="#999" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
		        </svg>
		      </div>
		      <input 
		      	valueLink={this.linkState('search')}  
		      	id="searchBar" 
		      	type="text" 
		      	placeholder="Search for lectures.."/>
		    </div>
		    <div className="col-lg-3 ">
		      <AddLecture />
		    </div>
		  </div>
		);
	}
});

module.exports = LectureListTitle;