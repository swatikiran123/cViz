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
