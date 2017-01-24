'use strict';

describe('Controller: SubjectsControllerCtrl', function () {

    // load the controller's module
    beforeEach(module('studymonitorApp'));

    var SubjectsControllerCtrl,
      scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        SubjectsControllerCtrl = $controller('SubjectsControllerCtrl', {
            $scope: scope
            // place here mocked dependencies
        });
    }));
});
