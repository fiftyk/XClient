'use strict';

describe('Controller: PolicealarmsCtrl', function () {

  // load the controller's module
  beforeEach(module('v2App'));

  var PolicealarmsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PolicealarmsCtrl = $controller('PolicealarmsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
