'use strict';

describe('Service: schooltimetableService', function () {

  // load the service's module
  beforeEach(module('studymonitorApp'));

  // instantiate service
  var schooltimetableService;
  beforeEach(inject(function (_schooltimetableService_) {
    schooltimetableService = _schooltimetableService_;
  }));

  it('should do something', function () {
    expect(!!schooltimetableService).toBe(true);
  });

});
