'use strict';

var mongoose = require('mongoose')
, Schema = mongoose.Schema;

var clientSchema = new mongoose.Schema({

	name 							: { type: String, trim: true, required: true },
	subName 						: { type: String, trim: true},
	// vertical						: { type: String, trim: true, required: true },clientsChildname
	// profile							: { type: String, trim: true, required: true },
	logo							: { type: String, trim: true },
	createOn						: { type: Date, default: Date.now },
	// competitors 					: [{ type: String, trim: true }],
	sfdcid 							: { type: String, trim: true },
	industry 						: { type: String, trim: true },
	regions 						: { type: String, trim: true },
	// offerings 						: [{ type: String, trim: true }],
	cscPersonnel					: {
		salesExec					: { type: Schema.Types.ObjectId, ref: 'User'},
		accountGM					: { type: Schema.Types.ObjectId, ref: 'User'},
		industryExec				: { type: Schema.Types.ObjectId, ref: 'User'},
		globalDelivery				: { type: Schema.Types.ObjectId, ref: 'User'},
		cre 						: { type: Schema.Types.ObjectId, ref: 'User'},
	},
	status 					: {type: String, enum: ['draft', 'final'], trim: true},
	
	
});

module.exports = mongoose.model('clients', clientSchema);