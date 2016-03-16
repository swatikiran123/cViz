var colors				= require('colors');

var util = {};

util.formatString = formatString;
util.dateOnly = dateOnly;

module.exports = util;

function formatString(str) {
  var args = [].slice.call(arguments, 1),
      i = 0;

  return str.replace(/%s/g, function() {
      return args[i++];
  });
};

function dateOnly(myDate){
	return (new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate()));
};

// string extender methods

String.prototype.repeat= function(n){
    n= n || 1;
    return Array(n+1).join(this);
}

String.prototype.compare = function(str){
	if(typeof str === 'object')
		str = "" + str;

	return this.trim().toLowerCase() == str.trim().toLowerCase();
}
