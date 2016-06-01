'use strict';

var mongoose = require('mongoose')
	, Schema = mongoose.Schema;

var commentSchema = new mongoose.Schema({

	comment 						: { type: String, required: true },
	givenBy							: { type: Schema.Types.ObjectId, ref: 'User' },
	givenOn							: { type: Date, default: Date.now }
	});

module.exports = mongoose.model('comments', commentSchema);