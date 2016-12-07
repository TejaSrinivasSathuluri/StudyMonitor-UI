'use strict';

describe('Service: smConstants', function () {

  // load the service's module
  beforeEach(module('studymonitorApp'));

  // instantiate service
  var smConstants;
  beforeEach(inject(function (_smConstants_) {
    smConstants = _smConstants_;
  }));

  it('should do something', function () {
    expect(!!smConstants).toBe(true);
  });

});
