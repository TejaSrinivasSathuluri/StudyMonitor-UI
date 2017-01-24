'use strict';

describe('Controller: ClassControllerCtrl', function () {

    // load the controller's module
    beforeEach(module('studymonitorApp'));

    var ClassControllerCtrl,
      scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        ClassControllerCtrl = $controller('ClassControllerCtrl', {
            $scope: scope
            // place here mocked dependencies
        });
    }));
});
