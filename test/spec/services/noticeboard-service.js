'use strict';

describe('Service: noticeboardService', function () {

  // load the service's module
  beforeEach(module('studymonitorApp'));

  // instantiate service
  var noticeboardService;
  beforeEach(inject(function (_noticeboardService_) {
    noticeboardService = _noticeboardService_;
  }));

  it('should do something', function () {
    expect(!!noticeboardService).toBe(true);
  });

});
