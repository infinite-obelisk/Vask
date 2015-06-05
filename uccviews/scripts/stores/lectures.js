'use strict'

var Dispatcher        = require('../dispatcher/dispatcher'),
	EventEmitter      = require('events').EventEmitter,
	assign            = require('object-assign'),
	lecturesConstants = require('../constants/lectures'),
	mui               = require('material-ui');

// Define the object that will contain the data (lectures)
var _lectures;
var _questions;
var _courses;
var _addlecture;

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
	  this.on(CHANGE_EVENT, callback)
	},

	removeChangeListener:function(callback){
	  this.removeListener(CHANGE_EVENT, callback)
	},

	getLectures: function(){
		return _lectures;
	},

	getQuestions: function(){
		return _questions;
	},

	getCourses: function(){
		return _courses;
	},
	
	getLectureResp: function(){
		return _addlecture;
	},
	

});

// Subscribe this store to recieve payloads from the dispatcher
LecturesStore.dispatcherToken = Dispatcher.register(function(payload){
	// Grab the action
	var action = payload.action;

	// Check whether the action can be used by the store
	switch(action.actionType) {
		case lecturesConstants.SET_LECTURES:
			_lectures = action.lectures;
			break;		
		case lecturesConstants.SET_COURSES:
			_courses = action.courses;
			break;
		case lecturesConstants.SET_QUESTIONS:
			_questions = action.questions;
			break;		
		case lecturesConstants.SET_LECTURE_RESP:
			_addlecture = action.response;
			break;
	}

	LecturesStore.emitChange();
});

module.exports = LecturesStore;