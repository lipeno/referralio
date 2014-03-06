'use strict';

angular.module('referralioApp')
  .controller("DashboardController", ["$scope", "$firebase", "firebaseRef",
    function($scope, $firebase, firebaseRef) {

      $scope.links = $firebase(firebaseRef('links'));
      $scope.newLink = "";
      $scope.errors = "";

      $scope.$watch('newLink', function () {
        $scope.links.$getIndex().forEach(function (id) {
          var link = $scope.links[id];
          if ($scope.newLink === link.title){
            $scope.errors = "This link already exists";
          }
          else{
            $scope.errors = "";
          }
        });
      }, true);

      $scope.addLink = function() {
        $scope.links.$add({title: $scope.newLink, clicks: 0});
        $scope.newLink = "";
      };

      $scope.removeLink = function (id) {
        $scope.links.$remove(id);
      };

      $scope.editedLinkId = null;
      $scope.editedLink = null;
      $scope.editLink = function (id) { // Starts the editing process and turns text into input box
        $scope.editedLinkId = id;
        $scope.editedLink = $scope.links[id];
        $scope.originalLink = angular.extend({}, $scope.editedLink);
      };

      $scope.doneEditing = function (id) { // Starts turns the input box into text and saves changes
        $scope.editedLinkId = null;
        $scope.editedLink = null;
        var title = $scope.links[id].title.trim();
        if (title) {
          $scope.links.$save(id);
        } else {
          $scope.removeLink(id);
        }
      }
    }
  ]);
