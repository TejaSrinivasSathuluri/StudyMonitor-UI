'use strict';

describe('Controller: ExpensesControllerCtrl', function () {

    // load the controller's module
    beforeEach(module('studymonitorApp'));

    var ExpensesControllerCtrl,
      scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        ExpensesControllerCtrl = $controller('ExpensesControllerCtrl', {
            $scope: scope
            // place here mocked dependencies
        });
    }));
});
