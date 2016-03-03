'use strict';

var mongoose             = require('mongoose')
	, Schema               = mongoose.Schema;

var userSchema           = require('./user');
var cityFactSchema       = require('./cityFactSchema');

var factSheetSchema = new mongoose.Schema({

  title 							: { type: String },
  logoLink            : { type: String },
  address             : { type: Object },
  strength            : { type: Number },

  locations           : [{
    name              : { type: String },
    city              : { type: Schema.Types.ObjectId, ref: 'cityFacts' },
    address           : { type: Object },
    strength          : { type: Number },
    facilities        : {
      name            : { type: String },
      address         : { type: String },
      type            : { type: String },
      strength        : { type: Number }
    }
  }],

  editdBy						 : { type: Schema.Types.ObjectId, ref: 'User' },
  editeOn						 : { type: Date, default: Date.now },

});

module.exports = mongoose.model('factSheets', factSheetSchema);
