'use strict';

/* directives */
angular.module('app').directive('ngConfirm', [function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.bind('click', function () {
                var message = attrs.ngConfirmMessage || 'Are you sure?';
                if (message && confirm(message)) {
                    scope.$apply(attrs.ngConfirm);
                }
            });
        }
    }
}]);

//$compile is responsible for compiling the view and linking it to the appropriate scope.
//$compile is required when we want to inject dynamic HTML into the view and use in this HTML interpolations or directives bindings
angular.module('app').directive('busyIndicator', ['$compile', function ($compile) {
    return {
        scope: true, //causes a new scope to be created when the directive is executed and link function is called
        /*link: function (scope, element, attr) {
            var linkfn = $compile('<div><label ng-show="busy" class="text-info glyphicon glyphicon-refresh spin"></label></div>');
            element.append(linkfn(scope));
        },*/
        /*compile: function (element, attr) {
            var busyHtml = '<div><label ng-show="busy" class="text-info glyphicon glyphicon-refresh spin"></label></div>';
            element.append(busyHtml);
        },*/

        transclude: true,
        template: '<div><div ng-transclude=""></div><label ng-show="busy" class="text-info glyphicon glyphicon-refresh spin"></label></div>',
        
        //directive controller function is used for inter-directive communications
        controller: ['$scope', function ($scope) {
            this.show = function () {
                $scope.busy = true;
            };
            this.hide = function () {
                $scope.busy = false;
            }
        }]
    }
}]);

angular.module('app').directive('ajaxButton', ['$compile', '$animate', function ($compile, $animate) {
    return {
        transclude: true,
        restrict: 'E',
        scope: {
            onClick: '&', //& - execute expression in context of parent scope
            submitting: '@' //@ - binds property to a DOM attribute value
        },
        replace: true, //replaces the directive DOM element woth template content
        template: '<button ng-disabled="busy">' +
                '<span class="glyphicon glyphicon-refresh spin" ng-show="busy"></span>' +
                '<span ng-transclude=""></span>' +
                '</button>',
        link: function (scope, element, attr) {
            if (attr.submitting !== undefined && attr.submitting != null) {
                attr.$observe("submitting", function (value) { //$observe is like a $watch ...
                   if (value) scope.busy = JSON.parse(value);
                });
            }
            if (attr.onClick) {
                element.on('click', function (event) {
                    scope.$apply(function () {
                        var result = scope.onClick();
                        if (attr.submitting !== undefined && attr.submitting != null) return;
                        if (result.finally) {
                            scope.busy = true;
                            result.finally(function () {
                                scope.busy = false;
                            })
                        }
                    })
                })
            }
        }
    }
}]);



























