'use strict';

describe('Service: gradeService', function () {

  // load the service's module
  beforeEach(module('studymonitorApp'));

  // instantiate service
  var gradeService;
  beforeEach(inject(function (_gradeService_) {
    gradeService = _gradeService_;
  }));

  it('should do something', function () {
    expect(!!gradeService).toBe(true);
  });

});
