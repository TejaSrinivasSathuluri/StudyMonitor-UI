'use strict';

describe('Service: classupgradeService', function () {

  // load the service's module
  beforeEach(module('studymonitorApp'));

  // instantiate service
  var classupgradeService;
  beforeEach(inject(function (_classupgradeService_) {
    classupgradeService = _classupgradeService_;
  }));

  it('should do something', function () {
    expect(!!classupgradeService).toBe(true);
  });

});
