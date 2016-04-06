var colors				= require('colors');
var moment 				= require('moment'); require('moment-range');

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

stringCmp = function(str1, str2){
	if(str1 === undefined && str2 == undefined)
		return true;

	if(str1 == undefined || str2 == undefined)
		return false;

	str1 = JSON.stringify(str1);
	str2 = JSON.stringify(str2);

	return str1.trim().toLowerCase() == str2.trim().toLowerCase();
}

String.prototype.contains = function(str){
	return (this.trim().toLowerCase().indexOf(str.trim().toLowerCase()) > -1)
}

String.prototype.containsAny = function(strValues){
	strValues.split(",").forEach(function(str){
		if (this.contains(str))
			return true;
	});
	return false;
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

// Array extension methods

arrContains = function(arr, element){
	var e = JSON.stringify(element);
	e = e.replaceAll('"','').trim().toLowerCase();
  return arr.join(',').indexOf(e) > -1;
}

arrUnique = function(arr) {
    var uarr = [];
    for(var i = 0; i < arr.length; i++) {
        if(!arrContains(uarr, arr[i])) {
            uarr.push(arr[i]);
        }
    }
    return uarr;
}

// Date functions

DateReplaceTime = function(date, time){
	var dt = moment(date);
	var ti = time.split(":");

	if(ti[0] !== undefined) 		dt.hour(ti[0]);
	if(ti[1] !== undefined) 		dt.minute(ti[1]);
	if(ti[2] !== undefined) 		dt.second(ti[1]);

	return dt.toString();
}

DateGetTime = function(date){
	return moment(date).format("HH:mm");
}

DatesInRange = function(dt1, dt2){
	var dayRange = moment.range(dt1, dt2);
	return (dayRange.toArray('days'));
}
