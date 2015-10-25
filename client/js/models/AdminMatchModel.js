angular.module('sovi.controllers').controller('AdminMatchModel', ['$scope',
  '$http', 'soviPreferences', function ($scope, $http, prefs) {
    $scope.table = {
      control: {
        data: {
          headers: [],
          rows: []
        }
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

    $http({method: 'GET', url: '/api/events'}).
      success(function(events, status, headers, config) {
        if (!events || events.length < 1) {
          return;
        }

        var orderingMask = ['Name', 'Is Official', 'Website'];
        var capitalizeOfficial = function(row, key) {
          if (key === 'isOfficial') {
            row[key] = _(row[key].toString()).capitalizeWord();
          }

          return row[key];
        };

        $scope.table.control.data = _.formatTableData(events, orderingMask, capitalizeOfficial);
        $scope.table.control.updateResults();
      }).
      error(function(data, status, headers, config) {
        console.log(data);
        console.log(status);
        console.log(headers);
        console.log(config);
      }
    );
}]);
