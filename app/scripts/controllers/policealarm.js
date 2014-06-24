'use strict';

angular.module('v2App')
  .controller('PolicealarmCtrl', ['$routeParams', '$scope', function ($routeParams, $scope) {
    console.log($routeParams.id);

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
