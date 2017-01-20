'use strict';

describe('Controller: MediauploadsControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('studymonitorApp'));

  var MediauploadsControllerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MediauploadsControllerCtrl = $controller('MediauploadsControllerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MediauploadsControllerCtrl.awesomeThings.length).toBe(3);
  });
});
