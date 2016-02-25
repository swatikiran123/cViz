'use strict';

var mongoose = require('mongoose')
	, Schema = mongoose.Schema;

var userSchema 				= require('./user');
var clientSchema 			= require('./client');
var visitSchema 			= require('./visit');
var feedbackDefSchema	= require('./feedbackDef');

var visitScheduleSchema = new mongoose.Schema({
	
	client 							: { type: Schema.Types.ObjectId, ref: 'Client' },
	visit								: { type: Schema.Types.ObjectId, ref: 'Visit' },
	scheduleDate				: { type: Date },
	session							: {
		startTime					: { type: Time },
		endTime						: { type: Time },
		title							: { type: String },
		speaker						: { type: Schema.Types.ObjectId, ref: 'User' },
		supporter					: { type: Schema.Types.ObjectId, ref: 'User' }
	},
	invitees						: [{ type: Schema.Types.ObjectId, ref: 'User' }],
	feedbackTemplate		: { type: Schema.Types.ObjectId, ref: 'FeedbackDef' }
	
});

module.exports = mongoose.model('visitors', visitorSchema);
