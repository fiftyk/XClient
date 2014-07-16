'use strict';

angular.module('v2App')
  .controller('SettingsCtrl', ['$scope', 'localStorageService', 'Auth', function ($scope ,localStorageService, Auth) {
    $scope.auth = {};
    $scope.auth.url = localStorageService.get('auth.url');

    $scope.policeAlarm = {};
    $scope.policeAlarm.url = localStorageService.get('policeAlarm.url');
    $scope.policeAlarm.maxsize = parseInt(localStorageService.get('policeAlarm.maxsize')||10);

    $scope.save = function (){
      localStorageService.set('auth.url', $scope.auth.url);
      localStorageService.set('policeAlarm.url', $scope.policeAlarm.url);
      localStorageService.set('policeAlarm.maxsize', $scope.policeAlarm.maxsize);
    };

    $scope.reset = function (){
      Auth.logout();
      localStorageService.remove('auth.url');
      localStorageService.remove('policeAlarm.url');
      localStorageService.set('policeAlarm.maxsize', 10);
      $scope.auth.url = localStorageService.get('auth.url');
      $scope.policeAlarm.url = localStorageService.get('policeAlarm.url');
      $scope.policeAlarm.maxsize = parseInt(localStorageService.get('policeAlarm.maxsize'));
    };

  }]);
