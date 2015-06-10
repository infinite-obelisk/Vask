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

	setPlaylist: function(playlist){
		Dispatcher.handleViewAction({
			actionType: lecturesConstants.SET_PLAYLIST,
			playlist: playlist
		});
	},

	setLectureInfo: function(info){
		Dispatcher.handleViewAction({
			actionType: lecturesConstants.SET_LECTURE_INFO,
			info: info
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

	addQuestion: function(question){
		var self = this,
			  url = '/addquestion';
		// Request the API for the data (lectures)
		request.post(url)
				 .send(question)
			   .set('Accept', 'application/json')
			   .end(function(err, res){
			   	if (err) {
			   		console.log('Failed fetching the server: lectures');
			   		throw err;
			   	}
			   	console.log('response from the server', res);
			   	if(res.ok){
			   		console.log('Question successfuly added..');
			   		// after successfuly saved, update the questions passing the video ID
			   		self.getQuestions(question.video);
			   		

			   	} else {
			   		// thow the error
			   		console.log('Ask question is not ok');
			   	}
			   });

	},

	getLectures: function(search){
		var self = this,
			  url = '/getlectures';

			  // if it's a search request, add the query to the get request
				url = search ? url + search : url;
				console.log('URL',url);

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

	getPlaylist: function(videoId){
		console.log('videoId',videoId);
		var self = this,
				url = "/getrelated?video=" + videoId;

		request.get(url)
					 .set('Accept', 'application/json')
				   .end(function(err, res){
					   	if (err) {
					   		console.log('Failed fetching the server');
					   		throw err;
					   	}
					   	console.log('response from the server', res);
					   	if(res.ok){

					   		var playlist = res.body;
					   		console.log('Playlist received:', playlist);
					   		self.setPlaylist(playlist);

					   	} else {
					   		console.log('Response is not ok');
					   	}
				   });
	},

	getLectureInfo: function(videoId){
		console.log('videoId',videoId);
		var self = this,
				url = "/getlectureinfo?video=" + videoId;

		request.get(url)
					 .set('Accept', 'application/json')
				   .end(function(err, res){
					   	if (err) {
					   		console.log('Failed fetching the server');
					   		throw err;
					   	}
					   	console.log('response from the server', res);
					   	if(res.ok){
					   		var info = res.body.result;
					   		self.setLectureInfo(info);

					   	} else {
					   		console.log('Response is not ok');
					   	}
				   });
	}
}