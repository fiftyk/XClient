'use strict';

angular.module('v2App')
  .controller('MainCtrl', ['$rootScope', '$scope', 'Policealarm', function ($rootScope, $scope, Policealarm) {
    //开始监听警情报警
    Policealarm.listen().then(null, null, function(){
      // console.log(data);
    });
  
    $scope.alarmList = Policealarm.getData();

  }]);
