'use strict';

var mongoose = require('mongoose')
	, Schema = mongoose.Schema;

var addressSchema = new mongoose.Schema({
	street: { type: String },
	city: { type: String },
  country: { type: String },
  zip: { type: String }
});

module.exports = mongoose.model('address', addressSchema);
