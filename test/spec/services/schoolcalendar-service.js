'use strict';

describe('Service: schoolcalendarService', function () {

  // load the service's module
  beforeEach(module('studymonitorApp'));

  // instantiate service
  var schoolcalendarService;
  beforeEach(inject(function (_schoolcalendarService_) {
    schoolcalendarService = _schoolcalendarService_;
  }));

  it('should do something', function () {
    expect(!!schoolcalendarService).toBe(true);
  });

});
