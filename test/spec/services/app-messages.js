'use strict';

describe('Service: appMessages', function () {

  // load the service's module
  beforeEach(module('studymonitorApp'));

  // instantiate service
  var appMessages;
  beforeEach(inject(function (_appMessages_) {
    appMessages = _appMessages_;
  }));

  it('should do something', function () {
    expect(!!appMessages).toBe(true);
  });

});
