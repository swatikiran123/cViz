'use strict';

var mongoose = require('mongoose')
	, Schema = mongoose.Schema;

var userSchema 				= require('./user');
var clientSchema 			= require('./client');
//var visitScheduleSchema 			= require('./visitSchedule');

var visitSchema = new mongoose.Schema({

	title							: { type: String },
	client 							: { type: Schema.Types.ObjectId, ref: 'client' },
	agenda							: { type: String },
	agm								: { type: Schema.Types.ObjectId, ref: 'User' },
	anchor							: { type: Schema.Types.ObjectId, ref: 'User' },
	schedule						: [{
		startDate					: { type: Date, default: Date.now },
		endDate						: { type: Date, default: Date.now },
		location					: { type: String }  // set of csc locations
	}],
	visitors						: [{
		visitor						: { type: Schema.Types.ObjectId, ref: 'User' },
		influence					: { type: String, lowercase: true, trim: true },		// {Decision Maker, Influencer, End User, Others}
	}],
	interest						: [{
		businessType				: { type: String, lowercase: true, trim: true },		// {new, repeat}
		visitType					: { type: String, lowercase: true, trim: true },		// {new, repeat}
		objective					: { type: String }
	}],
	status							: { type: String, lowercase: true, trim: true },		// {confirmed, tentative, freeze, done}
	createBy						: { type: Schema.Types.ObjectId, ref: 'User' },
	createOn						: { type: Date, default: Date.now }

});

module.exports = mongoose.model('visits', visitSchema);
