'use strict';

describe('Controller: ClasstimetableControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('studymonitorApp'));

  var ClasstimetableControllerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ClasstimetableControllerCtrl = $controller('ClasstimetableControllerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ClasstimetableControllerCtrl.awesomeThings.length).toBe(3);
  });
});
