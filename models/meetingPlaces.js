'use strict';

var mongoose = require('mongoose')
	, Schema = mongoose.Schema;

var meetingPlacesSchema = new mongoose.Schema({

		location 							: { type: String, required: true },
		meetingPlace						: { type: String, required: true }
	
});

module.exports = mongoose.model('meetingPlaces', meetingPlacesSchema);