angular.module('sovi.directives').directive('soviTable', function() {
  return {
    restrict: 'A',
    // TODO: Require here and editor
    scope: {
      'control': '=',
      'ipp': '=',
      'actions': '=',
      'doAction': '&',
      'onRowEdit': '&'
    },
    templateUrl: '/static/partials/modelEditor/tableViewer-directive.html',
    controller: ['$scope', '$filter', function($scope, $filter) {
      $scope.api = $scope.control || {data: { headers: [], rows: [] }};

      // Initialize Variables
      $scope.availableIpp = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
      $scope.api.data.allSelected = false;
      $scope.currentIppI = 0;
      $scope.visibleRows = [];
      $scope.selectedRows = [];
      $scope.totalItems = 0;

      for (var index in $scope.availableIpp) {
        if ($scope.ipp === $scope.availableIpp[index]) {
          $scope.currentIppI = index;
          break;
        }
      }

      // API
      $scope.changeIpp = function(newIpp, page, query) {
        $scope.ipp = newIpp;
        $scope.updateResults(1, query);
      };

      $scope.getPage = function(page, array) {
        var startI = page * $scope.ipp - $scope.ipp;
        var endI = Math.min(startI + $scope.ipp, array.length);

        return array.slice(startI, endI);
      };

      $scope.updateResults = function(page, query) {
        $scope.api.data.allSelected = false;
        $scope.allRowsToggle();
        page = page || 1;

        if (query && query !== '') {
          var results = $filter('filter')($scope.api.data.rows, query);
          $scope.totalItems = results.length;

          $scope.visibleRows = $scope.getPage(page, results);
        } else {
          $scope.totalItems = $scope.api.data.rows.length;
          $scope.visibleRows = $scope.getPage(page, $scope.api.data.rows);
        }
      };

      $scope.updateRowSelected = function(row) {
        if (row.isSelected === false) {
          $scope.api.data.allSelected = false;

          for (var i in $scope.selectedRows) {
            if ($scope.selectedRows[i] === row) {
              $scope.selectedRows.splice(i, 1);
              break;
            }
          }
        } else {
          if ($scope.selectedRows.push(row) === $scope.visibleRows.length) {
            $scope.api.data.allSelected = true;
          }
        }
      };

      $scope.allRowsToggle = function() {
        if ($scope.api.data.allSelected) {
          $scope.selectedRows = $scope.visibleRows.slice(0);
        } else {
          $scope.selectedRows.splice(0);
        }

        for(var i in $scope.visibleRows) {
          $scope.visibleRows[i].isSelected = $scope.api.data.allSelected;
        }
      };

      $scope.editRowCb = function(row) {
        $scope.onRowEdit({ row: row });
      };

      $scope.actionCb = function(action) {
        if (action) {
          $scope.doAction({ action: action });
        }
      };

      $scope.api.updateResults = $scope.updateResults;
    }],
  };
});

