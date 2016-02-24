'use strict';

var mongoose = require('mongoose')
	, Schema = mongoose.Schema;

var clientSchema = new mongoose.Schema({

	name 								: { type: String },
	vertical						: { type: String },
	profile							: { type: String },
	createOn						: { type: Date, default: Date.now },

});

module.exports = mongoose.model('clients', clientSchema);