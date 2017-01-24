'use strict';

describe('Controller: SchooltimetableControllerCtrl', function () {

    // load the controller's module
    beforeEach(module('studymonitorApp'));

    var SchooltimetableControllerCtrl,
      scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        SchooltimetableControllerCtrl = $controller('SchooltimetableControllerCtrl', {
            $scope: scope
            // place here mocked dependencies
        });
    }));
});
