'use strict';

angular.module('referralioApp')
  .controller("LandingController", ["$scope", "$firebase", "firebaseRef", "$routeParams",
    function($scope, $firebase, firebaseRef, $routeParams) {
      $scope.linkRequested = ""; // Referral query parameter
      if ($routeParams.link && $routeParams.link.length){
        $scope.linkRequested = $routeParams.link;
      }

      $scope.links = $firebase(firebaseRef('links')); // Links that the users have created
      $scope.exists = false;

      $scope.$watch('links', function () {
        $scope.links.$getIndex().forEach(function (id) {
          var link = $scope.links[id];
          if (($scope.linkRequested === link.title) && $scope.exists == false){
            $scope.exists = true;
            $scope.links[id].clicks = $scope.links[id].clicks + 1; // Tracking number of page views
            $scope.links.$save(id);
          }
        });
      }, true);

    }
  ]);
