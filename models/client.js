'use strict';

var mongoose = require('mongoose')
, Schema = mongoose.Schema;

var clientSchema = new mongoose.Schema({

	name 								: { type: String },
	vertical						: { type: String },
	profile							: { type: String },
	createOn						: { type: Date, default: Date.now },
	competitors 				: [{ type: String }],
	regions 						: [{ type: String }],
	offerings 					: [{ type: String }],
	cscPersonnel				: {
		salesExec					: { type: Schema.Types.ObjectId, ref: 'User' },
		accountGM					: { type: Schema.Types.ObjectId, ref: 'User' },
		industryExec			: { type: Schema.Types.ObjectId, ref: 'User' },
		globalDelivery		: { type: Schema.Types.ObjectId, ref: 'User' },
		cre 							: { type: Schema.Types.ObjectId, ref: 'User' },
	},
	netPromoterScore		: { type: Number }
	
});

module.exports = mongoose.model('clients', clientSchema);