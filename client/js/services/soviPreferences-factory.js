angular.module('sovi.services').factory('soviPreferences', function() {
  // Default Settings - TODO: Get from JSON!
  var keybinding = 'ace';
  var fontSize = '12px';
  var fontSizeOptions = ['10px', '11px', '12px', '13px', '14px', '16px', '18px',
                         '20px', '24px'];
  var theme = 'Monokai';
  var themeOptions = [
    'Ambiance', 'Chaos', 'Chrome', 'Clouds', 'Clouds Midnight', 'Cobalt',
    'Crimson Editor', 'Dawn', 'Dreamweaver', 'Eclipse', 'Github',
    'Idle Fingers', 'Katzenmilch', 'Kr Theme', 'Kuroir', 'Merbivore',
    'Merbivore Soft', 'Mono Industrial', 'Monokai', 'Pastel On Dark',
    'Solarized Dark', 'Solarized Light', 'Terminal', 'Textmate', 'Tomorrow',
    'Tomorrow Night', 'Tomorrow Night Blue', 'Tomorrow Night Bright',
    'Tomorrow Night Eighties', 'Twilight', 'Vibrant Ink', 'Xcode'
  ];

  // Add watch and settings  save

  return {
    // Editor
    editorKeybinding: keybinding,
    editorFontSize: fontSize,
    editorFontSizeOptions: fontSizeOptions,
    editorTheme: theme,
    editorThemeOptions: themeOptions,

    // Data
    dataViewerIpp: 20
  };
});
