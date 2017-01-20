'use strict';

describe('Controller: ProfileControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('studymonitorApp'));

  var ProfileControllerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProfileControllerCtrl = $controller('ProfileControllerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ProfileControllerCtrl.awesomeThings.length).toBe(3);
  });
});
