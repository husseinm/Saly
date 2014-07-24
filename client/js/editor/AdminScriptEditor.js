angular.module('sovi.controllers').controller('AdminScriptEditor', ['$scope',
  function($scope) {
    // Get the script and set the editor
    // HTTP
    $scope.scripter = {
      text: '# TODO: Actually GET the script from the server... And POST',
      onSave: function() {
      }
    };
}]);
