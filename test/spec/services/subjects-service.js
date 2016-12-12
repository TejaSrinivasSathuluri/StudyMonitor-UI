'use strict';

describe('Service: subjectsService', function () {

  // load the service's module
  beforeEach(module('studymonitorApp'));

  // instantiate service
  var subjectsService;
  beforeEach(inject(function (_subjectsService_) {
    subjectsService = _subjectsService_;
  }));

  it('should do something', function () {
    expect(!!subjectsService).toBe(true);
  });

});
