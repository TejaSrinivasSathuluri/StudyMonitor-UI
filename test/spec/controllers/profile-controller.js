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
});
