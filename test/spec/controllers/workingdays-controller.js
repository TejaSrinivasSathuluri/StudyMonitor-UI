'use strict';

describe('Controller: WorkingdaysControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('studymonitorApp'));

  var WorkingdaysControllerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    WorkingdaysControllerCtrl = $controller('WorkingdaysControllerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(WorkingdaysControllerCtrl.awesomeThings.length).toBe(3);
  });
});
