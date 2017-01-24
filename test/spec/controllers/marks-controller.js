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
});
