'use strict';

describe('Service: examlistService', function () {

  // load the service's module
  beforeEach(module('studymonitorApp'));

  // instantiate service
  var examlistService;
  beforeEach(inject(function (_examlistService_) {
    examlistService = _examlistService_;
  }));

  it('should do something', function () {
    expect(!!examlistService).toBe(true);
  });

});
