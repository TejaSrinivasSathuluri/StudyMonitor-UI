'use strict';

describe('Service: bulkremovalsService', function () {

  // load the service's module
  beforeEach(module('studymonitorApp'));

  // instantiate service
  var bulkremovalsService;
  beforeEach(inject(function (_bulkremovalsService_) {
    bulkremovalsService = _bulkremovalsService_;
  }));

  it('should do something', function () {
    expect(!!bulkremovalsService).toBe(true);
  });

});
