angular.module('sovi.controllers').controller('AdminAwardModel', ['$scope',
  'soviPreferences', function ($scope, prefs) {
    $scope.table = {
      data: {
        headers: ['col1', 'col2', 'col3', 'col4'],
        rows: []
      },
      ipp: prefs.dataViewerIpp,
      actions: ['Delete'],
      actionCb: function(action) {
        console.log(action);
      },
      editCb: function(row) {
        console.log(row);
      }
    };

    for (var i = 0; i < 100; i++) {
      $scope.table.data.rows.push({
        data: [i, i + 'a', i + 'b', i + 'c'],
        isSelected: false
      });
    }
}]);
