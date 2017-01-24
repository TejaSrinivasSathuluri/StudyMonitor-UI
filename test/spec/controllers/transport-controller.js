'use strict';

describe('Controller: TransportControllerCtrl', function () {

    // load the controller's module
    beforeEach(module('studymonitorApp'));

    var TransportControllerCtrl,
      scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        TransportControllerCtrl = $controller('TransportControllerCtrl', {
            $scope: scope
            // place here mocked dependencies
        });
    }));
});
