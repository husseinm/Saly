angular.module('sovi.controllers').controller('AdminAwardModel', ['$scope',
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

    var data = {
      events: [],
      awardTypes: [],
      awards: []
    };

    $http({method: 'GET', url: '/api/events'}).
      success(function(events, status, headers, config) {
        if (!events || events.length < 1) {
          return;
        }

        data.events = events;
        getAllAwardTypes();
      }).
      error(function(data, status, headers, config) {
        console.log(data);
        console.log(status);
        console.log(headers);
        console.log(config);
      }
    );

    var getAllAwardTypes = function() {
      $http({method: 'GET', url: '/api/awards/types'}).
        success(function(types, status, headers, config) {
          if (!types || types.length < 1) {
            return;
          }

          data.awardTypes = types;
          getAllAwards();
        }).
        error(function(data, status, headers, config) {
          console.log(data);
          console.log(status);
          console.log(headers);
          console.log(config);
        }
      );
    };

    var getAllAwards = function() {
      $http({method: 'GET', url: '/api/awards'}).
        success(function(awards, status, headers, config) {
          if (!awards || awards.length < 1) {
            return;
          }

          var orderingMask = ['Event', 'Type', 'Recipient'];

          var processingFunction = function(object, key) {
            if (key === 'event') {
              return _.find(data.events, function(event) {
                return event.id === object[key];
              }).name;
            } else if (key === 'type') {
              return _.find(data.awardTypes, function(type) {
                return type.id === object[key];
              }).type;
            }

            return object[key];
          };

          $scope.table.control.data = _.formatTableData(awards, orderingMask, processingFunction);
          $scope.table.control.updateResults();
        }).
        error(function(data, status, headers, config) {
          console.log(data);
          console.log(status);
          console.log(headers);
          console.log(config);
        }
      );
    };
}]);
