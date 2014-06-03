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
        title: 'Data',
        templateUrl: '/static/partials/data.html',
        controller: 'AdminModelEditor'
      }).
      when('/script', {
        title: 'Script',
        templateUrl: '/static/partials/editor.html',
        controller: 'AdminScriptEditor'
      }).
      when('/reports', {
        title: 'Reports',
        templateUrl: '/static/partials/reports.html',
        controller: 'AdminReportViewer'
      }).
      when('/preferences', {
        title: 'Preferences',
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

soviControllers.controller('AdminModelEditor', ['$scope', '$http', 
  function($scope, $http) {
  }]);

soviControllers.controller('AdminScriptEditor', ['$scope', '$http', 
  function($scope, $http) {
    /*
     * Setup
     */
    // TODO: Actually get the script and real preferences
    // Editor
    $scope.editor = ace.edit("editor");
    $scope.editor.getSession().setMode("ace/mode/python");
    $scope.currentTheme = 'Monokai';
    $scope.currentFontSize = 12;
    $scope.currentKeybinding = 'ace';

    // All Fonts
    $scope.fontSizes = [10, 11, 12, 13, 14, 16, 18, 20, 24];

    angular.element(document).ready(function() {
      $scope.editorDOM = angular.element(document.querySelector('#editor'));
    });

    // Themes
    $scope.themes = [
      'Ambiance', 'Chaos', 'Chrome', 'Clouds', 'Clouds Midnight', 'Cobalt',
      'Crimson Editor', 'Dawn', 'Dreamweaver', 'Eclipse', 'Github',
      'Idle Fingers', 'Katzenmilch', 'Kr Theme', 'Kuroir', 'Merbivore',
      'Merbivore Soft', 'Mono Industrial', 'Monokai', 'Pastel On Dark',
      'Solarized Dark', 'Solarized Light', 'Terminal', 'Textmate', 'Tomorrow',
      'Tomorrow Night', 'Tomorrow Night Blue', 'Tomorrow Night Bright',
      'Tomorrow Night Eighties', 'Twilight', 'Vibrant Ink', 'Xcode'
    ];

    /* 
     * Buttons Hooks
     */
    // Fullscreen
    angular.element(document).on('webkitfullscreenchange mozfullscreenchange' +
                                'msfullscreenchange fullscreenchange',
                                function(e) {
      angular.element('main').toggleClass('fullscreen-main');
      angular.element('#fullscreenButton').toggleClass('editor-controls-button-active');
    });

    $scope.toggleFullscreen = function() {
      if (!(document.fullscreenElement ||
          document.webkitFullscreenElement ||
          document.mozFullScreenElement ||
          document.msFullscreenElement)) {
        var elem = angular.element('main')[0];

        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        } else if (elem.msRequestFullscreen) {
          elem.msRequestFullscreen();
        } else if (elem.mozRequestFullScreen) {
          elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
          elem.webkitRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen(); 
        } else if (document.webkitExitFullscreen) {
         document.webkitExitFullscreen();
        } else if (document.mozCancelFullscreen) {
          document.mozCancelFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }
    }

    // Themes
    $scope.themeSelected = function(theme) {
      return $scope.currentTheme === theme;
    }

    $scope.setTheme = function(name) {
      $scope.editor.setTheme("ace/theme/" + name.toLowerCase().replace(/ /g,"_"));
      $scope.currentTheme = name;
    }

    // Font Size
    $scope.fontSizeSelected = function(size) {
      return $scope.currentFontSize === size;
    }

    $scope.setFontSize = function(size) {
      $scope.editorDOM.css('font-size', (size + 'px'));
      $scope.currentFontSize = size;
    }

    // Keybindings
    $scope.keybindingSelected = function(keybinding) {
      return $scope.currentKeybinding === keybinding;
    }

    $scope.setKeybinding = function(keybinding) {
      if (keybinding === 'vim') {
        $scope.editor.setKeyboardHandler('ace/keyboard/vim');
      } else if (keybinding === 'emacs') {
        $scope.editor.setKeyboardHandler('ace/keyboard/emacs');
      } else {
        $scope.editor.setKeyboardHandler(null);
      }

      $scope.currentKeybinding = keybinding;
    }

    // Read only
    $scope.toggleReadOnly = function() {
      $scope.editor.setReadOnly(!$scope.editor.getReadOnly());
    }

    // Save
    $scope.save = function() {
      $scope.editor.session.getValue();
      // TODO: actually post the settings & text
    }

    /*
     * Apply Settings
     */
    $scope.setTheme($scope.currentTheme);
    $scope.setFontSize($scope.currentFontSize);
    $scope.setKeybinding($scope.currentKeybinding);
  }]);

soviControllers.controller('AdminReportViewer', ['$scope', '$http', 
  function($scope, $http) {
  }]);

soviControllers.controller('AdminPreferences', ['$scope', '$http', 
  function($scope, $http) {
  }]);

