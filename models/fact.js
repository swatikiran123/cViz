'use strict';

var mongoose = require('mongoose')
	, Schema = mongoose.Schema;

var factSchema = new mongoose.Schema({

	title 							: { type: String, trim: true},
	editedBy						: { type: Schema.Types.ObjectId, ref: 'User' },
	createOn						: { type: Date, default: Date.now },
     
	location                        : {type: String,trim: true},
    indiafact                       : {type: String, trim: true},
    noida                           : {type: String, trim: true},
    indore                   : {type: String, trim: true},
    vadodara                    : {type: String, trim: true},
    mumbai                    : {type: String, trim: true},
    hyderabad                    : {type: String, trim: true},
    banglore                    : {type: String, trim: true},
    chennai                    : {type: String, trim: true},
    solan                    : {type: String, trim: true},
    shimoga                    : {type: String, trim: true},
    gurgaon                    : {type: String, trim: true},
    pune                    : {type: String, trim: true},
    locationfact                    : {type: String, trim: true},
  

	});

module.exports = mongoose.model('facts', factSchema);