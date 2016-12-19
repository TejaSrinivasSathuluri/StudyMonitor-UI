'use strict';

describe('Service: assignmentsService', function () {

  // load the service's module
  beforeEach(module('studymonitorApp'));

  // instantiate service
  var assignmentsService;
  beforeEach(inject(function (_assignmentsService_) {
    assignmentsService = _assignmentsService_;
  }));

  it('should do something', function () {
    expect(!!assignmentsService).toBe(true);
  });

});
