'use strict';

describe('Controller: ExamlistControllerCtrl', function () {

    // load the controller's module
    beforeEach(module('studymonitorApp'));

    var ExamlistControllerCtrl,
      scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        ExamlistControllerCtrl = $controller('ExamlistControllerCtrl', {
            $scope: scope
            // place here mocked dependencies
        });
    }));
});
