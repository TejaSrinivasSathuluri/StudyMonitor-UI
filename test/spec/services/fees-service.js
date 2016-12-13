'use strict';

describe('Service: feesService', function () {

  // load the service's module
  beforeEach(module('studymonitorApp'));

  // instantiate service
  var feesService;
  beforeEach(inject(function (_feesService_) {
    feesService = _feesService_;
  }));

  it('should do something', function () {
    expect(!!feesService).toBe(true);
  });

});
