'use strict';

describe('Controller: GradeControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('studymonitorApp'));

  var GradeControllerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GradeControllerCtrl = $controller('GradeControllerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(GradeControllerCtrl.awesomeThings.length).toBe(3);
  });
});
