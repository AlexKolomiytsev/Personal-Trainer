/**
 * Created by sanya on 20.05.2016.
 */
angular.module('WorkoutBuilder')
    .directive('workoutTile', function () {
       return {
           restrict: 'E',
           templateUrl: 'partials/workoutbuilder/workout-tile.html'
       }
    });