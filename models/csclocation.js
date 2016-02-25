'use strict';

var mongoose = require('mongoose')
	, Schema = mongoose.Schema;

var csclocationSchema = new mongoose.Schema({

	id 							: { type: String },
	name						: { type: String, required: true},
	info						: { type: String, required: true},
	url							: { type: String },
	pos 						: { coordinates: {type: "Number", index: '2dsphere'} }

});


module.exports = mongoose.model('csclocations', csclocationSchema);