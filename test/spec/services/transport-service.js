'use strict';

describe('Service: transportService', function () {

  // load the service's module
  beforeEach(module('studymonitorApp'));

  // instantiate service
  var transportService;
  beforeEach(inject(function (_transportService_) {
    transportService = _transportService_;
  }));

  it('should do something', function () {
    expect(!!transportService).toBe(true);
  });

});
