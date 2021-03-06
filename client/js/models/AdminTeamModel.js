angular.module('sovi.controllers').controller('AdminTeamModel', ['$scope',
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

    $http({method: 'GET', url: '/api/teams'}).
      success(function(teams, status, headers, config) {
        if (!teams || teams.length < 1) {
          return;
        }

        var orderingMask = ['Number', 'Name', 'Country', 'Region', 'Locality',
                            'Website'];

        $scope.table.control.data = _.formatTableData(teams, orderingMask);
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
