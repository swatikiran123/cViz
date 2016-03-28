// Library of standard scripts


// parse(str) : printf like string substitution for %s

function parse(str) {
  var args = [].slice.call(arguments, 1),
      i = 0;

  return str.replace(/%s/g, function() {
      return args[i++];
  });
}


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
