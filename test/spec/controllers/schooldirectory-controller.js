'use strict';

describe('Controller: SchooldirectoryControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('studymonitorApp'));

  var SchooldirectoryControllerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SchooldirectoryControllerCtrl = $controller('SchooldirectoryControllerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SchooldirectoryControllerCtrl.awesomeThings.length).toBe(3);
  });
});
