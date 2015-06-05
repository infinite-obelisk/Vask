'use strict'

var Dispatcher = require('../dispatcher/dispatcher'),
	assign     = require('object-assign'),
	request    = require('superagent'),
	lecturesConstants = require('../constants/lectures');

module.exports = {

	// When ready, dispatch the lectures to the store
	setLectures: function(lectures){
		Dispatcher.handleViewAction({
			actionType: lecturesConstants.SET_LECTURES,
			lectures: lectures
		});
	},	

	setCourses: function(courses){
		Dispatcher.handleViewAction({
			actionType: lecturesConstants.SET_COURSES,
			courses: courses
		});
	},

	setQuestions: function(questions){
		Dispatcher.handleViewAction({
			actionType: lecturesConstants.SET_QUESTIONS,
			questions: questions
		});
	},

	addLecture: function(lecture){
		var self = this,
			  url = '/addlecture';
		// Request the API for the data (lectures)
		request.post(url)
				 .send(lecture)
			   .set('Accept', 'application/json')
			   .end(function(err, res){
			   	if (err) {
			   		console.log('Failed fetching the server: lectures');
			   		throw err;
			   	}
			   	console.log('response from the server', res);
			   	if(res.ok){
			   		
			   		// update the list
			   		self.getLectures();

			   	} else {
			   		// thow the error
			   		console.log('Response is not ok');
			   	}
			   });

	},

	getLectures: function(){
		var self = this,
			url = '/getlectures';
		// Request the API for the data (lectures)
		request.get(url)
			   .set('Accept', 'application/json')
			   .end(function(err, res){
			   	if (err) {
			   		console.log('Failed fetching the server: lectures');
			   		throw err;
			   	}
			   	console.log('response from the server', res);
			   	if(res.ok){
			   		console.log(res.body.result);
			   		// get the data from the response
			   		var lectures = res.body.result;
			   		// send the data to dispatcher
			   		self.setLectures(lectures);

			   	} else {
			   		// thow the error
			   		console.log('Response is not ok');
			   	}
			   });
	},

	getCourses: function(){
		var self = this,
			url = '/getcourses';
		// Request the API for the data (lectures)
		request.get(url)
			   .set('Accept', 'application/json')
			   .end(function(err, res){
			   	if (err) {
			   		console.log('Failed fetching the server: courses');
			   		throw err;
			   	}
			   	console.log('response from the server', res);
			   	if(res.ok){
			   		// get the data from the response
			   		var courses = res.body.result;
			   		// send the data to dispatcher
			   		self.setCourses(courses);

			   	} else {
			   		// thow the error
			   		console.log('Response is not ok');
			   	}
			   });
	},

	getQuestions: function(videoId){
		var thiz = this,
				url = "/getquestions?video=" + videoId;

		request.get(url)
					 .set('Accept', 'application/json')
				   .end(function(err, res){
					   	if (err) {
					   		console.log('Failed fetching the server');
					   		throw err;
					   	}
					   	console.log('response from the server', res);
					   	if(res.ok){

					   		var questions = res.body.result;
					   		thiz.setQuestions(questions);
					   	} else {
					   		console.log('Response is not ok');
					   	}
				   });
	}
}