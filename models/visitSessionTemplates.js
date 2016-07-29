'use strict';

var mongoose = require('mongoose')
	, Schema = mongoose.Schema;

var userSchema 				= require('./user');
var clientSchema 			= require('./client');
var visitSchema 			= require('./visit');
var feedbackDefSchema	= require('./feedbackDef');

var visitSessionTemplatesSchema = new mongoose.Schema({
	sessionTemplateTitle			: { type: String, trim: true },
	visit							: { type: Schema.Types.ObjectId, ref: 'visits', required: true },
	session							: {
		type						: { type: String, trim: true, required: true }, //presentation, discussion, tea, lunch, dinner, floor-walk
		title						: { type: String, trim: true },
		location					: { type: String, trim: true },
		desc						: { type: String, trim: true },
		owner						: { type: Schema.Types.ObjectId, ref: 'User' },
		supporter					: { type: Schema.Types.ObjectId, ref: 'User' }
	},
	invitees						: [{ type: Schema.Types.ObjectId, ref: 'User' }],
	feedbackTemplate				: { type: Schema.Types.ObjectId, ref: 'feedbackDefs' }
});

module.exports = mongoose.model('visitSessionTemplates', visitSessionTemplatesSchema);
