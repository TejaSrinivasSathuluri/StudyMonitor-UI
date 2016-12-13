'use strict';

/**
 * @ngdoc service
 * @name studymonitorApp.expensesService
 * @description
 * # expensesService
 * Service in the studymonitorApp.
 */
angular.module('studymonitorApp')
  .service('expensesService', function ($q,School) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.getExpensesBySchoolId = function (schoolId){
    	var _activepromise = $q.defer ();
    	School.findOne( {filter :{ where :{ id : $scope.userData.schoolId },include:'expensePayments'}},
            function(response){
              _activepromise.resolve(response);
            },function (error){
            	_activepromise.reject(response);
            });
    	return _activepromise.promise;
    }
  });
