'use strict';

describe('Service: marksService', function () {

  // load the service's module
  beforeEach(module('studymonitorApp'));

  // instantiate service
  var marksService;
  beforeEach(inject(function (_marksService_) {
    marksService = _marksService_;
  }));

  it('should do something', function () {
    expect(!!marksService).toBe(true);
  });

});
