'use strict';

describe('Controller: MessagesControllerCtrl', function () {

    // load the controller's module
    beforeEach(module('studymonitorApp'));

    var MessagesControllerCtrl,
      scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        MessagesControllerCtrl = $controller('MessagesControllerCtrl', {
            $scope: scope
            // place here mocked dependencies
        });
    }));
});
