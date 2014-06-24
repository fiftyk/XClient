'use strict';

describe('Controller: PolicealarmCtrl', function () {

  // load the controller's module
  beforeEach(module('v2App'));

  var PolicealarmCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PolicealarmCtrl = $controller('PolicealarmCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
