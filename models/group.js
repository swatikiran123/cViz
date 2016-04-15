'use strict';

var mongoose = require('mongoose')
	, Schema = mongoose.Schema;

var userSchema = require('./user');

var groupSchema = new mongoose.Schema({

	name 							: { type: String, required: true },
	description						: { type: String, required: true },
	users 							: [{ type: Schema.Types.ObjectId, ref: 'User' }]
	
	});

module.exports = mongoose.model('group', groupSchema);