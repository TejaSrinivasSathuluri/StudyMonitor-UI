'use strict';

describe('Controller: SchoolcalendarControllerCtrl', function () {

    // load the controller's module
    beforeEach(module('studymonitorApp'));

    var SchoolcalendarControllerCtrl,
      scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        SchoolcalendarControllerCtrl = $controller('SchoolcalendarControllerCtrl', {
            $scope: scope
            // place here mocked dependencies
        });
    }));
});
