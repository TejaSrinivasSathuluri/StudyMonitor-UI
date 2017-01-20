'use strict';

describe('Controller: MarksControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('studymonitorApp'));

  var MarksControllerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MarksControllerCtrl = $controller('MarksControllerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MarksControllerCtrl.awesomeThings.length).toBe(3);
  });
});
