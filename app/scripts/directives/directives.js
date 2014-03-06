'use strict';

angular.module('referralioApp')
  .directive('elementBlur', function () {
    return function (scope, elem, attrs) {
      elem.bind('blur', function () {
        scope.$apply(attrs.elementBlur);
      });
    };
  });

angular.module('referralioApp')
  .directive('elementFocus', function elementFocus($timeout) {
    return function (scope, elem, attrs) {
      scope.$watch(attrs.elementFocus, function (newVal) {
        if (newVal) {
          $timeout(function () {
            elem[0].focus();
          }, 0, false);
        }
      });
    };
  });