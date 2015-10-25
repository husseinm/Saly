angular.module('sovi.directives').directive('soviEditor', ['soviPreferences', 
  function(prefs) {
    return {
      restrict: 'A',
      scope: {
        ngModel: '=',
        onSave: '&'
      },
      templateUrl: '/static/partials/editor/editor-directive.html',
      controller: ['$scope', function($scope) {
        // Init Vars
        $scope.ngModel = $scope.ngModel || '';
        $scope.isFullscreen = false;
        $scope.themes = prefs.editorThemeOptions;
        $scope.fontSizes = prefs.editorFontSizeOptions;

        /*
         * Button Hooks
         */
        // Fullscreen
        $scope.toggleFullscreen = function() {
          if (!(document.fullscreenElement ||
              document.webkitFullscreenElement ||
              document.mozFullScreenElement ||
              document.msFullscreenElement)) {
            var elem = document.getElementById('sovi-editor-wrapper');

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
        };

        angular.element(document).on('webkitfullscreenchange ' +
                                     'mozfullscreenchange ' +
                                     'msfullscreenchange ' +
                                     'fullscreenchange', function(e) {
          $scope.$apply(function() {
            $scope.isFullscreen = !$scope.isFullscreen;
          });
        });

        // Theme
        $scope.themeSelected = function(theme) {
          return $scope.currentTheme === theme;
        };

        $scope.setTheme = function(name) {
          $scope.editor.setTheme("ace/theme/" + name.toLowerCase().replace(/ /g,
                                                                           "_"));
          $scope.currentTheme = name;
        };

        // Font Size
        $scope.fontSizeSelected = function(size) {
          return $scope.currentFontSize === size;
        };

        $scope.setFontSize = function(size) {
          $scope.currentFontSize = size;
        };

        // Keybindings
        $scope.keybindingSelected = function(keybinding) {
          return $scope.currentKeybinding === keybinding;
        };

        $scope.setKeybinding = function(keybinding) {
          if (keybinding === 'vim') {
            $scope.editor.setKeyboardHandler('ace/keyboard/vim');
          } else if (keybinding === 'emacs') {
            $scope.editor.setKeyboardHandler('ace/keyboard/emacs');
          } else {
            $scope.editor.setKeyboardHandler(null);
          }

          $scope.currentKeybinding = keybinding;
        };

        // Read only
        $scope.toggleReadOnly = function() {
          $scope.editor.setReadOnly(!$scope.editor.getReadOnly());
        };

        // Save
        $scope.save = function() {
          var newText = $scope.getText();

          if ($scope.lastSave !== newText) { 
            $scope.lastSave = newText;
            $scope.onSave();
          }
        };
        
        /*
         * API
         */
        $scope.setText = function(text) {
          return $scope.editor.session.setValue(text);
        };

        $scope.getText = function() {
          return $scope.editor.session.getValue();
        };

        // Watch for pref change in case multiple editors on single page
        $scope.prefs = prefs;
        $scope.$watch('prefs', function (newVal, oldVal, scope) {
          if (newVal && newVal !== oldVal) { 
            $scope.setTheme(newVal.editorTheme);
            $scope.setFontSize(newVal.editorFontSize);
            $scope.setKeybinding(newVal.editorKeybinding);
          }
        });

        $scope.$watch('ngModel', function(newVal, oldVal, scope) {
          if (!$scope.textChangeOk) {
            if (newVal && newVal !== oldVal) { 
              $scope.setText(newVal);
            }
          }

          $scope.textChangeOk = false;
        });

        $scope.init = function(attrs) {
          // ID the editor to have > 1 per page
          var editorId = attrs.id + 'Editor';

          angular.element(document.getElementById('editor')).attr('id',
                                                                  editorId);

          $scope.editor = ace.edit(editorId);
          $scope.editor.getSession().setMode("ace/mode/python");
          $scope.editor.$blockScrolling = Infinity;

          // Emit save every x

          // Apply all settings to user prefs
          $scope.setText($scope.ngModel);
          $scope.setTheme(prefs.editorTheme);
          $scope.setFontSize(prefs.editorFontSize);
          $scope.setKeybinding(prefs.editorKeybinding);

          // NOTE: Cannot edit text during a save event - due to $apply
          // Must be after to prevent initial change fire
          $scope.editor.on('change', function(e) {
            $scope.$apply(function() {
              $scope.textChangeOk = true;
              $scope.ngModel = $scope.getText();
            });
          });
        };
      }],
      link: function($scope, element, attrs) {
        $scope.init(attrs);
      }
    };
}]);
