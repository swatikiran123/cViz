'use strict';

var mongoose = require('mongoose')
, Schema = mongoose.Schema;

var userSchema = require('./user');

var teaserSchema = new mongoose.Schema({

	title 				: { type: String },
	teaser				: { type: String },
	type                : { type: String }, // video/audio/text
	teaserText          : { type: String },
	externalLink        : { type: String },
	tags				: [],
	createdBy			: { type: Schema.Types.ObjectId, ref: 'User' },
	createOn			: { type: Date, default: Date.now },

});

//var User = mongoose.model('User', userSchema);

module.exports = mongoose.model('teasers', teaserSchema);
