'use strict';

describe('Controller: ClassupgradeControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('studymonitorApp'));

  var ClassupgradeControllerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ClassupgradeControllerCtrl = $controller('ClassupgradeControllerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ClassupgradeControllerCtrl.awesomeThings.length).toBe(3);
  });
});
