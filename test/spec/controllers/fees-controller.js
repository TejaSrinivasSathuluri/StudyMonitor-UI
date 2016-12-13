'use strict';

describe('Controller: FeesControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('studymonitorApp'));

  var FeesControllerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FeesControllerCtrl = $controller('FeesControllerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(FeesControllerCtrl.awesomeThings.length).toBe(3);
  });
});
