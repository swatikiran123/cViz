angular.module('confirmDialogDirective', [])

.factory('confirmDialogService', ['$document', '$q', '$compile', function($document, $q, $compile) {
  var self = this,
      $body = $document.find('body'),
      tpl;

  var generateTpl = function (headerText, content, yesText, noText) {
    var tpl = angular.element(
    '<div class="cd-overlay"></div>' +
    '<div class="cd" ng-controller="confirmDialogController as ncdctrl" ng-class="{\'load\': true}">' +
    '<md-toolbar>'+
    '  <div class="md-toolbar-tools">' +
    '    <h3>' + headerText + '</h3>' +
    '     <span flex></span>'+
    '     <md-icon><i class="fa fa-close close"  ng-click="ncdctrl.cancel()"></i></md-icon>' +
    '  </div>' +
    '</md-toolbar>'+
    '  <div class="cd-content">' +
    '    <span>' + content + '</span>' +
    '  </div>' +
    '  <div class="cd-actions">' +
    '    <button type="button" class="btn btn-primary" ng-click="ncdctrl.confirm()">' + yesText + '</button>' +
    '    <button type="button" class="btn btn-danger" ng-click="ncdctrl.cancel()">' + noText + '</button>' +
    '  </div>' +
    '</div>');

    return tpl;
  };

  var deffered;

  self.open = function (headerText, content, yesText, noText) {
    deffered = $q.defer();
    tpl = generateTpl(headerText, content, yesText, noText);
    $body.append(tpl);

    var scope = tpl.scope();
    $compile(tpl)(scope);

    $document.bind('mousewheel', function(e) {
      e.preventDefault();
    });

    return deffered.promise;
  };

  self.close = function () {
    deffered.reject();
    $document.unbind('mousewheel');
    angular.element(tpl).remove();
  };

  self.confirm = function () {
    deffered.resolve();
    self.close();
  };

  return self;
}])

.controller('confirmDialogController', ['confirmDialogService', function(confirmDialogService) {
  var self = this;

  self.confirm = function () {
    confirmDialogService.confirm();
  };

  self.cancel = function () {
    confirmDialogService.close();
  };

}])

.directive('confirmDialog', ['$document', 'confirmDialogService', function($document, confirmDialogService) {
  'use strict';

  var setScopeValues = function (scope, attrs) {
    scope.headerText = attrs.headerText || 'Are you sure?';
    scope.content = attrs.content || 'Are you sure you want to delete?';
    scope.yesText = attrs.yesText || 'Yes';
    scope.noText = attrs.noText || 'No';
  };

  var key_codes = {
    enter : 13,
    esc   : 27,
  };

  return {
    priority: 1,
    restrict: 'A',
    scope: {
      ngClick: '&'
    },
    link: function (scope, element, attrs) {
      setScopeValues(scope, attrs);

      var $body = $document.find('body');

      element.unbind('click');

      element.bind('click', function (e) {
        e.preventDefault();

        confirmDialogService.open(scope.headerText, scope.content, scope.yesText, scope.noText).then(scope.ngClick);
      });

      $body.bind('keydown', function (e) {
        var which = e.which;

        if (which === key_codes.esc) {
          confirmDialogService.close();
        } else if (which === key_codes.enter) {
          confirmDialogService.confirm();
        }

        scope.$apply();
      });

    }
  };

}]);