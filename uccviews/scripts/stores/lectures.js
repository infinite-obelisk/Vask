	'use strict'

var Dispatcher        = require('../dispatcher/dispatcher'),
	EventEmitter      = require('events').EventEmitter,
	assign            = require('object-assign'),
	lecturesConstants = require('../constants/lectures'),
	questionsConstants = require('../constants/questions'),
	mui               = require('material-ui');

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
			_lectures = action.lectures;
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