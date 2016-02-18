'use strict';

var mongoose = require('mongoose');

var keynoteSchema = new mongoose.Schema({

	title 							: { type: String },
	noteText						: { type: String },
	tags								: [],
	speaker							: { type: String },
	createOn						: { type: Date, default: Date.now },
	desc								: { type: String },
	externalLink				: { type: String }

});

module.exports = mongoose.model('keynotes', keynoteSchema);