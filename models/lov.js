'use strict';

var mongoose = require('mongoose')
	, Schema = mongoose.Schema;

var lovSchema = new mongoose.Schema({

	name 								: { type: String },
	values							: [{ type: String }]

	});

module.exports = mongoose.model('lovs', lovSchema);