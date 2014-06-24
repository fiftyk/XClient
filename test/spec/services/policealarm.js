'use strict';

describe('Service: Policealarm', function () {

  // load the service's module
  beforeEach(module('v2App'));

  // instantiate service
  var Policealarm;
  beforeEach(inject(function (_Policealarm_) {
    Policealarm = _Policealarm_;
  }));

  it('should do something', function () {
    expect(!!Policealarm).toBe(true);
  });

});
