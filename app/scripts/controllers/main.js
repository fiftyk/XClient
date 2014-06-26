'use strict';

angular.module('v2App')
  .controller('MainCtrl', ['$rootScope', '$scope', 'Policealarm', function ($rootScope, $scope, Policealarm) {
    
    $scope.alarmList = Policealarm.getData();
    
    var defer = Policealarm.listen();
    
    if(defer){
      defer.then(null, null, function(){
        // console.log($scope.alarms.length);
      });
    }

  }]);
