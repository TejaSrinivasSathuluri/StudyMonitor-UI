'use strict';

describe('Controller: NoticeboardControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('studymonitorApp'));

  var NoticeboardControllerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NoticeboardControllerCtrl = $controller('NoticeboardControllerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(NoticeboardControllerCtrl.awesomeThings.length).toBe(3);
  });
});
