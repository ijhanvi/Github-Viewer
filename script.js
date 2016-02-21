// Code goes here
(function() {

  var app = angular.module("githubViewer", []);

  var MainController = function($scope, $http, $interval, $log) {

    var onUserComplete = function(response) {
      $scope.user = response.data;
      $http.get($scope.user.repos_url)
        .then(onRepos, onError);
    }

    var onRepos = function(response) {
      $scope.repos = response.data;
    }


    var onError = function(reason) {
      $scope.error = "Could not fetch the data"
    }

    var decrementCount = function() {
      $scope.countdown -= 1;
      if ($scope.countdown < 1) {
        $scope.countdown = "Saerching Time up"
        $scope.search($scope.username);
      }
    };
    var countdowninterval = null;
    var startCountDown = function() {
      countdowninterval = $interval(decrementCount, 1000, $scope.countdown);
    }

    $scope.search = function(username) {
      $log.info("Searching for " + username)
      $http.get("https://api.github.com/users/" + username)
        .then(onUserComplete, onError);
      if (countdowninterval) {
        $interval.cancel(countdowninterval);
        $scope.countdown = null;
      }
    }
    $scope.username = "robconery"
    $scope.message = "GitHub Viewer"
    $scope.sortOrderBy = "-stargazers_count"
    $scope.countdown = 5
    startCountDown()
  };
  app.controller("MainController", MainController);

}());
