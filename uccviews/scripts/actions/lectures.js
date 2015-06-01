'use strict'

var Dispatcher = require('../dispatcher/dispatcher'),
	assign     = require('object-assign'),
	request    = require('superagent'),
	lecturesConstants = require('../constants/lectures'); 

module.exports = {

	setLectures: function(lectures){
		Dispatcher.handleViewAction({
			actionType: lecturesConstants.SET_LECTURES,
			lectures: lectures
		});
	},

	getLectures: function(){
		var self = this;
		request.get('/getlectures'),
			   .type('application/json')
			   .set({
			   	'X-Requested-With': 'XMLHttpRequest'
			   })
			   .end(function(res){
			   	if(res.ok){
			   		// get the data from the response
			   		var lectures = res.body.result;
			   		// send the data to dispatcher
			   		self.setLectures(lectures);

			   	} else {
			   		// thow the error
			   		console.log('Failed fetching the contents from the server')
			   	}
			   });
	}

}