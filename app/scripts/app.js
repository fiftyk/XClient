'use strict';

angular
  .module('v2App', [
    'ngRoute',
    'mobile-angular-ui',
    'LocalStorageModule'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/policeAlarm/:id', {
        templateUrl: 'views/policealarm.html',
        controller: 'PolicealarmCtrl'
      })
      .when('/policeAlarms', {
        templateUrl: 'views/policealarms.html',
        controller: 'PolicealarmsCtrl'
      })
      .when('/settings', {
        templateUrl: 'views/settings.html',
        controller: 'SettingsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
