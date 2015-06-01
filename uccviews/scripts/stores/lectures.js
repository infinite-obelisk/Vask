'use strict'

var Dispatcher = require('../dispatcher/dispatcher'),
	EventEmitter = require('events').EventEmitter,
	assign       = require('object-assign');

// Define the object that will contain the data (lectures) 
var _lectures;

// Pattern to defone the variable that will inform a new change
var CHANGE_EVENT = 'change'

// all the logic for the store goes here
// Extends the LEcturesStore prototype with the EventEmitter;

// PAY ATTENTION HERE!!!!! We are expecting an object
var LecturesStore = assign(null, EventEmitter.prototype, {
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
	}
});

// Subscribe this store to recieve payloads from the dispatcher
LecturesStore.dispatcherToken = Dispatcher.register(function(payload){

	// Grab the action
	var action = payload.action;

	// Check whether the action can be used by the store
	switch(action.actionType) {
		case 'SET_LECTURES': 
			_lectures = action.lectures;
			this.emitChange();
			break;
	}
});

module.exports = LecturesStore;