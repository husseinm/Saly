'use strict';

var sovi = angular.module('sovi', [
    'ngRoute',
    'soviControllers',
]);

/* Router */
sovi.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider.
      when('/', {
        title: 'Home',
        templateUrl: '/static/partials/home.html',
        controller: 'AdminHome'
      }).
      when('/script', {
        title: 'Script Editor',
        templateUrl: '/static/partials/editor.html',
        controller: 'AdminScriptEditor'
      }).
      when('/users/me/preferences', {
        title: 'My Preferences',
        templateUrl: '/static/partials/preferences.html',
        controller: 'AdminPreferences'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);

sovi.run(['$location', '$rootScope', function($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}]);

/* Controllers */
var soviControllers = angular.module('soviControllers', []);

soviControllers.controller('AdminHome', ['$scope', '$http', 
  function($scope, $http) {
  }]);

soviControllers.controller('AdminScriptEditor', ['$scope', '$http', 
  function($scope, $http) {
    // Init editor with defaults...
    $scope.editor = ace.edit("editor");
    $scope.editor.setTheme("ace/theme/solarized_dark");
    $scope.editor.getSession().setMode("ace/mode/python");
  }]);

soviControllers.controller('AdminPreferences', ['$scope', '$http', 
  function($scope, $http) {
  }]);

