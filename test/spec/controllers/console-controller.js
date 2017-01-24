'use strict';

describe('Controller: ConsoleControllerCtrl', function () {

    // load the controller's module
    beforeEach(module('studymonitorApp'));

    var ConsoleControllerCtrl,
      scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        ConsoleControllerCtrl = $controller('ConsoleControllerCtrl', {
            $scope: scope
            // place here mocked dependencies
        });
    }));
});
