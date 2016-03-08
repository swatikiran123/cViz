'use strict';

var mongoose = require('mongoose')
	, Schema = mongoose.Schema;

var userSchema = require('./user');

var cityFactSchema = new mongoose.Schema({

  	name: { type: String },
  	desc: { type: String },
	bannerLink: { type: String },

  	geospot: { type: [Number], index: '2dsphere'},

	places : [{
		name: { type: String },
	  	desc: { type: String },
		imageLinks: [{ type: String }],
		geospot: {type: [Number], index: '2dsphere'},
		quickFacts: [{type: String }],
	}],

  quickFacts: [{type: String }],

  editBy: { type: Schema.Types.ObjectId, ref: 'User' },
  editOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('city_facts', cityFactSchema);
