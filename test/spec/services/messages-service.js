'use strict';

describe('Service: messagesService', function () {

  // load the service's module
  beforeEach(module('studymonitorApp'));

  // instantiate service
  var messagesService;
  beforeEach(inject(function (_messagesService_) {
    messagesService = _messagesService_;
  }));

  it('should do something', function () {
    expect(!!messagesService).toBe(true);
  });

});
