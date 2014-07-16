'use strict';

var sovi = angular.module('sovi', [
    'ngRoute',
    'ui.bootstrap',
    'sovi.controllers',
    'sovi.services',
    'sovi.directives'
]);

// Router
sovi.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider.
      when('/', {
        title: 'Data',
        templateUrl: '/static/partials/data.html',
      }).
      when('/teams', {
        title: 'Team Data',
        templateUrl: '/static/partials/teamModel.html',
        controller: 'AdminTeamModel'
      }).
      when('/events', {
        title: 'Event Data',
        templateUrl: '/static/partials/eventModel.html',
        controller: 'AdminEventModel'
      }).
      when('/awards', {
        title: 'Award Data',
        templateUrl: '/static/partials/awardModel.html',
        controller: 'AdminAwardModel'
      }).
      when('/matches', {
        title: 'Match Data',
        templateUrl: '/static/partials/matchModel.html',
        controller: 'AdminMatchModel'
      }).
      when('/script', {
        title: 'Script',
        templateUrl: '/static/partials/editor/index.html',
        controller: 'AdminScriptEditor'
      }).
      when('/reports', {
        title: 'Reports',
        templateUrl: '/static/partials/reports.html',
        controller: 'AdminReportViewer'
      }).
      otherwise({
        redirectTo: '/'
      });
}]);

// Init
sovi.run(['$location', '$rootScope', function($location, $rootScope) {
    /* jshint unused:false */
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
        $rootScope.showSpinner = false;
    });

    $rootScope.$on('$routeChangeStart', function (event, current, previous) {
        $rootScope.showSpinner = true;
    });

    $rootScope.titleContains = function(name) {
      $rootScope.title = $rootScope.title || '';

      return $rootScope.title.toLowerCase().indexOf(name.toLowerCase()) > -1;
    };
    /* jshint unused:true */
}]);

// Module Definitions
angular.module('sovi.services', []);
angular.module('sovi.directives', []);
angular.module('sovi.controllers', ['sovi.services', 'sovi.directives']);

