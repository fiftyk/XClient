'use strict';

angular.module('v2App')
  .directive('eventClick', ['$rootScope', function ($rootScope) {
    return {
      restrict: 'A',
      scope: {
        eventClick: '=',
        eventData: '=?',
      },
      link: function postLink(scope, element) {
        var onClick = function (){
          $rootScope.$broadcast(scope.eventClick, scope.eventData);
        };

        element.bind('click', onClick);

        scope.$on('$destroy', function (){
          element.unbind('click', onClick);
        });

      }
    };
  }]);
