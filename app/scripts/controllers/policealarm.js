'use strict';

angular.module('v2App')
  .controller('PolicealarmCtrl', ['$routeParams', '$scope', 'Policealarm', function ($routeParams, $scope, Policealarm) {
    var index = parseInt($routeParams.id);

    $scope.alarms = Policealarm.getData();
    $scope.record = $scope.alarms[index];

    $scope.openBrowers = function (){
      try{
        // var win = gui.Window.open('http://localhost:8000/atms/#/JCZH.ZHDD.Dispatch/17010/Edit', {
        //   position: 'center',
        //   width: 1440,
        //   height: 960
        // });
      }catch(i){

      }
    };
    
  }]);
