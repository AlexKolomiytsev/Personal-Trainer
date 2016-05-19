/**
 * Created by sanya on 05.05.2016.
 */
angular.module('app').
config(function ($routeProvider, $sceDelegateProvider, WorkoutServiceProvider, ApiKeyAppenderInterceptorProvider, $httpProvider) {

    ApiKeyAppenderInterceptorProvider.setApikey("dxutsfn8IwNW0usGzQ6nSiOaL4bLCpM1");
    $httpProvider.interceptors.push('ApiKeyAppenderInterceptor');
    
    WorkoutServiceProvider.configure("personaltrainerdb");


    $routeProvider.when('/start', { 
        templateUrl: 'partials/start.html',
        controller: 'WorkoutListController'
    });
    /*$routeProvider.when('/workout', {
        templateUrl: 'partials/workout.html', 
        controller: 'WorkoutController' 
    });*/
    $routeProvider.when('/workout/:id', {
        templateUrl: 'partials/workout.html',
        controller: 'WorkoutController',
        resolve: {
            selectedWorkout: ['WorkoutRunnerService', '$route', function (WorkoutRunnerService, $route) {
                return WorkoutRunnerService.startRunning($route.current.params.id)
            }]
        }
    });
    $routeProvider.when('/finish', { 
        templateUrl: 'partials/finish.html' 
    });

    $routeProvider.when('/builder', {
        redirectTo: '/builder/workouts'
    });

    $routeProvider.when('/builder/workouts', {
        templateUrl: 'partials/workoutbuilder/workouts.html',
        leftNav: 'partials/workoutbuilder/left-nav-main.html',
        topNav: 'partials/workoutbuilder/top-nav.html',
        controller: 'WorkoutListController'
    });
    $routeProvider.when('/builder/exercises', {
        templateUrl: 'partials/workoutbuilder/exercises.html',
        leftNav: 'partials/workoutbuilder/left-nav-main.html',
        topNav: 'partials/workoutbuilder/top-nav.html',
        controller:'ExerciseListController'
    });
    $routeProvider.when('/builder/workouts/new', {
        templateUrl: 'partials/workoutbuilder/workout.html',
        leftNav: 'partials/workoutbuilder/left-nav-exercises.html',
        topNav: 'partials/workoutbuilder/top-nav.html',
        controller: 'WorkoutDetailController',
        resolve: {
            selectedWorkout: ['WorkoutBuilderService', function (WorkoutBuilderService) {
                return WorkoutBuilderService.startBuilding();
            }],
        }
    });
    $routeProvider.when('/builder/workouts/:id', {
        templateUrl: 'partials/workoutbuilder/workout.html',
        leftNav: 'partials/workoutbuilder/left-nav-exercises.html',
        controller: 'WorkoutDetailController',
        topNav: 'partials/workoutbuilder/top-nav.html',
        routeErrorMessage: "404! Could not load the specific workout!",
        resolve: {
            selectedWorkout: ['WorkoutBuilderService', '$route', '$location', function (WorkoutBuilderService, $route, $location) {
                return WorkoutBuilderService.startBuilding($route.current.params.id);
            }]
        }
    });
    $routeProvider.when('/builder/exercises/new', {
        templateUrl: 'partials/workoutbuilder/exercise.html',
        controller: 'ExerciseDetailController',
        topNav: 'partials/workoutbuilder/top-nav.html'
    });
    $routeProvider.when('/builder/exercises/:id', {
        templateUrl: 'partials/workoutbuilder/exercise.html',
        controller: 'ExerciseDetailController',
        topNav: 'partials/workoutbuilder/top-nav.html'
    });


    $routeProvider.otherwise({ redirectTo: '/start' });

    $sceDelegateProvider.resourceUrlWhitelist([
        // Allow same origin resource loads.
        'self',
        // Allow loading from our assets domain.  Notice the difference between * and **.
        'http://*.youtube.com/**']);
});
