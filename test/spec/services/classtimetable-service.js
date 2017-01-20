'use strict';

describe('Service: classtimetableService', function () {

  // load the service's module
  beforeEach(module('studymonitorApp'));

  // instantiate service
  var classtimetableService;
  beforeEach(inject(function (_classtimetableService_) {
    classtimetableService = _classtimetableService_;
  }));

  it('should do something', function () {
    expect(!!classtimetableService).toBe(true);
  });

});
