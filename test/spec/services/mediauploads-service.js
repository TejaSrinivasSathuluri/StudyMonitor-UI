'use strict';

describe('Service: mediauploadsService', function () {

  // load the service's module
  beforeEach(module('studymonitorApp'));

  // instantiate service
  var mediauploadsService;
  beforeEach(inject(function (_mediauploadsService_) {
    mediauploadsService = _mediauploadsService_;
  }));

  it('should do something', function () {
    expect(!!mediauploadsService).toBe(true);
  });

});
