'use strict';

var mongoose = require('mongoose')
, _ = require('underscore')
, Schema = mongoose.Schema;

var userSchema 				= require('./user');
var clientSchema 			= require('./client');

var visitSchema = new mongoose.Schema({

	title						    : { type: String, required: true },
	client 						    : { type: Schema.Types.ObjectId, ref: 'clients', required: true },//{ type: String },
	agenda							: { type: String, required: true },
	agm								: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	anchor							: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	schedule						: [{
		startDate					: { type: Date, required: true},
		endDate						: { type: Date, required: true},
		location					: { type: String, required: true },//hyd, places
		meetingPlace				: { type: String }//area where
	}],
	billable						: { type: String, lowercase: true, trim: true, required: true, enum: ['billable', 'non-billable']},
	wbsCode							: { type: String, trim: true },
	chargeCode						: { type: String, trim: true },
	visitors						: [{
		visitor						: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		influence					: { type: String, lowercase: true, trim: true, required: true },		// {Decision Maker, Influencer, End User, Others}
	}],
	interest						: {
		businessType			    : { type: String, lowercase: true, trim: true, required: true },		// {new, repeat}
		visitType					: { type: String, lowercase: true, trim: true, required: true },		// {new, repeat}
		objective					: { type: String, required: true }
	},
	status							: { type: String, lowercase: true, trim: true, required: true },		// {confirmed, tentative, freeze, done}
	createBy						: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	createOn						: { type: Date, default: Date.now, required: true },
	feedbackTmpl				    : { type: Schema.Types.ObjectId, ref: 'feedbackDefs', required: false },
	// sessionFeedback				    : { type: Schema.Types.ObjectId, ref: 'feedbackDefs', required: false },
	 keynote						: [{
		note   						: { type: Schema.Types.ObjectId, ref: 'keynotes', required: false },
	 	context 					: {type: String, enum: ['welcome', 'thankyou'], required: false},
	 	order						: {type: Number, required: false}
	 }],
	 invitees						: [{
	 invite 						:{ type: Schema.Types.ObjectId, ref: 'User' }
	}]

});

visitSchema.post('init', function(doc) {

	var schedules =  _.sortBy( doc.schedule, 'startDate' );
	var startDate = schedules[0].startDate;
	var endDate = schedules[schedules.length-1].endDate;
	var locations = "";

	schedules.forEach(function(sch){
		if(locations === "")
		 locations = sch.location;
	 else
		 locations = locations + ", " + sch.location;
	})

	// add temporary variable to be added to doc
	doc.set( "locations", locations, { strict: false });
	doc.set( "startDate", startDate, { strict: false });
	doc.set( "endDate", endDate, { strict: false });
});

module.exports = mongoose.model('visits', visitSchema);
