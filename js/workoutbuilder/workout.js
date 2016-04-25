'use strict';

angular.module('WorkoutBuilder')
  .controller('WorkoutListController', ['$scope', 'WorkoutService', '$location', function ($scope, WorkoutService, $location) {
      $scope.goto = function (workout) {
          $location.path('/builder/workouts/' + workout.name);
      }
      var init = function () {
          $scope.workouts = WorkoutService.getWorkouts();
      };
      init();
  }]);

angular.module('WorkoutBuilder')
    .controller('WorkoutDetailController', ['$scope', 'WorkoutBuilderService', 'selectedWorkout',
        function ($scope, WorkoutBuilderService, selectedWorkout) {
        var init = function () {
          $scope.workout = selectedWorkout;
        };
        init();
    }]);