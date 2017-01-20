'use strict';

describe('Service: workingdaysService', function () {

  // load the service's module
  beforeEach(module('studymonitorApp'));

  // instantiate service
  var workingdaysService;
  beforeEach(inject(function (_workingdaysService_) {
    workingdaysService = _workingdaysService_;
  }));

  it('should do something', function () {
    expect(!!workingdaysService).toBe(true);
  });

});
