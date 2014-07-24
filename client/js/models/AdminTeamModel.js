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

        $scope.table.control.data.headers = ['Number', 'Name', 'Country',
                                             'Region', 'Locality', 'Website'];

        // Create Func Arange + Flatten
        _.each(teams, function(team) {
          var currentRow = [];
          
          _.each($scope.table.control.data.headers, function(column) {
            var key = column.toLowerCase();

            if (team[key] === '') {
              team[key] = 'None';
            }

            currentRow.push(team[key]);
          });

          $scope.table.control.data.rows.push({
            data: currentRow,
            isSelected: false
          });
        });

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
