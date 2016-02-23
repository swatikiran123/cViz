// Library of standard scripts


// parse(str) : printf like string substitution for %s

function parse(str) {
  var args = [].slice.call(arguments, 1),
      i = 0;

  return str.replace(/%s/g, function() {
      return args[i++];
  });
};

