	'use strict'

var Dispatcher        = require('../dispatcher/dispatcher'),
	EventEmitter      = require('events').EventEmitter,
	assign            = require('object-assign'),
	lecturesConstants = require('../constants/lectures'),
	questionsConstants = require('../constants/questions'),
	mui               = require('material-ui');

// METHODS

function parseDescription(lectures, size){	  
  var parsed = lectures.map(function(lecture, i){
  	if (lecture.description.length > size) {
  		lecture.description = lecture.description.slice(0,size) + "..";
  	}
  	return lecture;
  });
  return parsed;
}
// Function to convert a number to HH:MM:SS format
String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); 
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    var time    = hours+':'+minutes+':'+seconds;
    return time;
}

// Define the object that will contain the data (lectures)
var _lectures;
var _questions;
var _courses;
var _addlecture;
var _playlist;
var _progress;
var _lectureInfo;

// Pattern to define the variable that will inform a new change
var CHANGE_EVENT = 'change'

// all the logic for the store goes here
// Extends the LEcturesStore prototype with the EventEmitter;

// PAY ATTENTION HERE!!!!! We are expecting an object
var LecturesStore = assign(EventEmitter.prototype, {
	// Inform the view that something changed
	emitChange: function(){
		// Emit the change
		this.emit(CHANGE_EVENT);
	},

	addChangeListener:function(callback){
		console.log('Lectures Listener! invoking cb!', callback);
	  this.on(CHANGE_EVENT, callback)
	},

	removeChangeListener:function(callback){
	  this.removeListener(CHANGE_EVENT, callback)
	},

	getLectures: function(){
		return _lectures;
	},

	getCourses: function(){
		return _courses;
	},

	getLectureResp: function(){
		return _addlecture;
	},

	getPlaylist: function(){
		return _playlist;
	},

	getPlaylistProgress: function(){
		return _progress;
	},

	getLectureInfo: function(){
		return _lectureInfo;
	},

	getQuestions: function(){
	  return _questions;
	}

});

// Subscribe this store to recieve payloads from the dispatcher
LecturesStore.dispatcherToken = Dispatcher.register(function(payload){
	// Grab the action
	var action = payload.action;
	// console.log('NEW DISPATCH!!!', action);
	// Check whether the action can be used by the store
	switch(action.actionType) {
		case lecturesConstants.SET_LECTURES:
			_lectures = parseDescription(action.lectures, 235);
			break;
		case lecturesConstants.SET_COURSES:
			_courses = action.courses;
			break;
		case lecturesConstants.SET_LECTURE_RESP:
			_addlecture = action.response;
			break;
		case lecturesConstants.SET_PLAYLIST:
			_playlist = action.playlist.result;
			_progress = action.playlist.progress;
			break;
		case lecturesConstants.SET_LECTURE_INFO:
			_lectureInfo = action.info;
			break;
		case questionsConstants.SET_QUESTIONS:
      _questions = action.questions;
      break;
	}

	LecturesStore.emitChange();
});

module.exports = LecturesStore;