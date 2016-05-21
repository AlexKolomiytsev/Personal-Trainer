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


/*
angular.module('app').directive('remoteValidator', ['$parse', function ($parse) {
    return {
        require: 'ngModel', //dependency on --mg-model-- directive
        //ngModelCtrl - requiered directive controller (зависимость директивы, на самом деле - зависимость контроллера директивы)
        link: function (scope, elm, attr, ngModelCtrl) {
            var expfn = $parse(attr["remoteValidatorFunction"]); //$parse - traslate string into a function
            var validatorName = attr["remoteValidator"];
            ngModelCtrl.$parsers.push(function (value) { //регистрируем функцию валидации на контроллере
                var result = expfn(scope, {'value': value});
                if (result.then) {
                    result.then(function (data) {
                        ngModelCtrl.$setValidity(validatorName, true);
                    },
                    function (error) {
                        ngModelCtrl.$setValidity(validatorName, false);
                    });
                }
            });
        }
    }
}]);*/

angular.module('app').directive('remoteValidator', ['$parse', function ($parse) {
    return {
        require: 'ngModel',
        link: function (scope, elem, attr, ngModelCtrl) {
            var expfn = $parse(attr['remoteValidatorFunction']);
            var validatorName = attr['remoteValidator'];
            ngModelCtrl.$asyncValidators[validatorName] = function (value) {
                return expfn(scope, { 'value': value });
            }
        }
    };
}]);
