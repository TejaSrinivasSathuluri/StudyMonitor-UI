'use strict';

/**
 * @ngdoc function
 * @name studymonitorApp.controller:ExpensesControllerCtrl
 * @description
 * # ExpensesControllerCtrl
 * Controller of the studymonitorApp
 */
angular.module('studymonitorApp')
  .controller('ExpensesController', function (expensesService, $cookies, $timeout) {
      var ExpensesCtrl = this;

      function init() {
          ExpensesCtrl.schoolId = $cookies.getObject('uds').schoolId;
          this.getExpenseRecords = function () {
              expensesService.getExpensesBySchoolId(ExpensesCtrl.schoolId).then(function (response) {
                  if (response && response.hasOwnProperty('expensePayments')) {
                      ExpensesCtrl.expensesList = response.expensePayments;

                      //Trigger the editable datatable
                      $timeout(function () {
                          TableEditable.init();
                      });
                  }
              }, function (error) {
                  console.log('Error while fetching expense records. Error stack : ' + error);
              });
          }
      }

      (new init()).getExpenseRecords();
  });
