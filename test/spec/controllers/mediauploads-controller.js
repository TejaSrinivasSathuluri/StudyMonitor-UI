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
});
