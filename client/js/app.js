'use strict';

// Module Definitions
angular.module('sovi.services', []);
angular.module('sovi.directives', []);
angular.module('sovi.controllers', ['sovi.services']);

var sovi = angular.module('sovi', [
    'ngRoute',
    'ui.bootstrap',
    'ui.route',
    'sovi.controllers',
    'sovi.services',
    'sovi.directives'
]);

// Router
sovi.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider.
      when('/data', {
        title: 'Data Selection',
        templateUrl: '/static/partials/data.html',
      }).
      when('/data/teams', {
        title: 'Team Data',
        templateUrl: '/static/partials/teamModel.html',
        controller: 'AdminTeamModel'
      }).
      when('/data/events', {
        title: 'Event Data',
        templateUrl: '/static/partials/eventModel.html',
        controller: 'AdminEventModel'
      }).
      when('/data/awards', {
        title: 'Award Data',
        templateUrl: '/static/partials/awardModel.html',
        controller: 'AdminAwardModel'
      }).
      when('/data/matches', {
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
        redirectTo: '/data'
      });
}]);

// Init
sovi.run(['$location', '$rootScope', function($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current) {
        $rootScope.title = current.$$route.title;
        $rootScope.showSpinner = false;
    });

    $rootScope.$on('$routeChangeStart', function () {
        $rootScope.showSpinner = true;
    });
}]);
