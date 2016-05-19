'use strict';

angular.module('app')
  .controller('RootController', ['$scope', '$uibModal', function ($scope, $uibModal) {
      $scope.showWorkoutHistory = function () {
          var dailog = $uibModal.open({
              templateUrl: 'partials/workout-history.html',
              controller: WorkoutHistoryController,
              size: 'lg'
          });
      };

      var WorkoutHistoryController = function ($scope, $uibModalInstance, workoutHistoryTracker) {
          $scope.search = {};
          $scope.search.completed = '';
          $scope.history = workoutHistoryTracker.getHistory();

          $scope.ok = function () {
              $uibModalInstance.close();
          };
      };
      WorkoutHistoryController['$inject'] = ['$scope', '$uibModalInstance', 'workoutHistoryTracker'];

      $scope.$on('$routeChangeSuccess', function (e, current, previous) {
          $scope.currentRoute = current;
          $scope.routeHasError = false;
      });

      $scope.$on('$routeChangeError', function (e, current, previous, error) {
         if (error.status === 404 && (current.originalPath === '/builder/workouts/:id')) {
             $scope.routeHasError = true;
             $scope.routeError = current.routeErrorMessage;
         }
      });
  }]);
