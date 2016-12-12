angular.module('askaudience.directives', [])
        .filter('capitalize', function () {
            return function (input) {
                return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
            }
        })
        .filter('html', function ($sce) {
            return function (input) {
                return $sce.trustAsHtml(input);
            }
        })
        .directive('validPasswordC', function () {
            return {
                require: 'ngModel',
                link: function (scope, elm, attrs, ctrl) {
                    ctrl.$parsers.unshift(function (viewValue, $scope) {
                        var noMatch = viewValue != scope.changePwdForm.password.$viewValue
                        ctrl.$setValidity('noMatch', !noMatch)
                    })
                }
            }
        })
        .directive('focusMe', ['$timeout', '$parse', function ($timeout, $parse) {
                return {
                    //scope: true,   // optionally create a child scope
                    link: function (scope, element, attrs) {
                        var model = $parse(attrs.focusMe);
                        scope.$watch(model, function (value) {
                            console.log('value=', value);
                            if (value === true) {
                                $timeout(function () {
                                    element[0].focus();
                                });
                            }
                        });
                        // to address @blesh's comment, set attribute value to 'false'
                        // on blur event:
                        element.bind('blur', function () {
                            console.log('blur');
                            scope.$apply(model.assign(scope, false));
                        });
                    }
                };
            }]);