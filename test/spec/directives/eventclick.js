'use strict';

describe('Directive: eventClick', function () {

  // load the directive's module
  beforeEach(module('v2App'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<event-click></event-click>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the eventClick directive');
  }));
});
