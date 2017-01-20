'use strict';

describe('Service: schooldirectoryService', function () {

  // load the service's module
  beforeEach(module('studymonitorApp'));

  // instantiate service
  var schooldirectoryService;
  beforeEach(inject(function (_schooldirectoryService_) {
    schooldirectoryService = _schooldirectoryService_;
  }));

  it('should do something', function () {
    expect(!!schooldirectoryService).toBe(true);
  });

});
