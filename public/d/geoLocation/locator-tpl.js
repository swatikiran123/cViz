(function(module) {
try { app = angular.module("locator"); }
catch(err) { app = angular.module("locator", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("location-picker/location-picker.html",
    "<ul>\n" +
    "\n" +
    "  <!-- Reverse Geocode Results -->\n" +
    "   <span class=\"glyphicon glyphicon-map-marker\"/>"+
    "  <li ng-repeat=\"option in options | limitTo:limitTo\"\n" +
    "    ng-click=\"pickLocation(option)\"\n" +
    "    item=\"option\">{{option.address_components[0].short_name}},&nbsp{{option.address_components[1].short_name}}</li>\n" +
    "\n" +
    "  <!-- Loading -->\n" +
    "  <li ng-if=\"!options\">Loading &hellip;</li>\n" +
    "\n" +
    "</ul>");
}]);
})();
