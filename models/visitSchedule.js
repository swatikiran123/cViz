'use strict';

var mongoose = require('mongoose')
	, Schema = mongoose.Schema;

var userSchema 				= require('./user');
var clientSchema 			= require('./client');
var visitSchema 			= require('./visit');
var feedbackDefSchema	= require('./feedbackDef');

var visitScheduleSchema = new mongoose.Schema({
    client 							: { type: Schema.Types.ObjectId, ref: 'clients', required: true },
	visit							: { type: Schema.Types.ObjectId, ref: 'visits', required: true },
	scheduleDate					: { type: Date, required: true },
	session							: {
		type						: { type: String, trim: true, required: true }, //presentation, discussion, tea, lunch, dinner, floor-walk
		startTime					: { type: Date, required: true},
		endTime						: { type: Date, required: true},
		title						: { type: String, trim: true },
		location					: { type: String, trim: true },
		desc						: { type: String, trim: true },
		owner						: { type: Schema.Types.ObjectId, ref: 'User' },
		supporter					: { type: Schema.Types.ObjectId, ref: 'User' }
	},
	invitees						: [{ type: Schema.Types.ObjectId, ref: 'User' }],
	feedbackElg						: { type: String, trim: true },
	feedbackTemplate				: { type: Schema.Types.ObjectId, ref: 'feedbackDefs' },
	status							: { type: String, trim: true, enum: ['active', 'cancelled']},
	comments						: [{type: Schema.Types.ObjectId, ref: 'comments'}]

});

module.exports = mongoose.model('visit_schedules', visitScheduleSchema);
