'use strict';

describe('Controller: AssignmentsControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('studymonitorApp'));

  var AssignmentsControllerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AssignmentsControllerCtrl = $controller('AssignmentsControllerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AssignmentsControllerCtrl.awesomeThings.length).toBe(3);
  });
});
