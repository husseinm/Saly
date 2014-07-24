angular.module('sovi.controllers').controller('AdminPanelUi', ['$scope',
  'soviPreferences', function ($scope, prefs) {
    $scope.sidebarHidden = true;

    $scope.toggleSidebar = function() {
      $scope.sidebarHidden = !$scope.sidebarHidden;
    };

    // TODO: If needed implement Spinner here
}]);
