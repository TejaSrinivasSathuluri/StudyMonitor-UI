'use strict';

describe('Service: bulkuploadService', function () {

  // load the service's module
  beforeEach(module('studymonitorApp'));

  // instantiate service
  var bulkuploadService;
  beforeEach(inject(function (_bulkuploadService_) {
    bulkuploadService = _bulkuploadService_;
  }));

  it('should do something', function () {
    expect(!!bulkuploadService).toBe(true);
  });

});
