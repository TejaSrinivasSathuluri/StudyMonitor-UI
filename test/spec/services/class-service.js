'use strict';

describe('Service: classService', function () {

  // load the service's module
  beforeEach(module('studymonitorApp'));

  // instantiate service
  var classService;
  beforeEach(inject(function (_classService_) {
    classService = _classService_;
  }));

  it('should do something', function () {
    expect(!!classService).toBe(true);
  });

});
