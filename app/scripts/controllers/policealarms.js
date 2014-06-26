'use strict';

angular.module('v2App')
  .controller('PolicealarmsCtrl', ['$scope', 'Policealarm', function ($scope, Policealarm) {
    
    $scope.alarms = Policealarm.getData();

    var defer = Policealarm.listen();
    if(defer){
      defer.then(null, null, function(){
        // console.log($scope.alarms.length);
      });
    }
    
  }]);
