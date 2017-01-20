'use strict';

/**
 * @ngdoc service
 * @name studymonitorApp.expensesService
 * @description
 * # expensesService
 * Service in the studymonitorApp.
 */
angular.module('studymonitorApp')
  .service('expensesService', function ($q, School,ExpensePayment) {
      // AngularJS will instantiate a singleton by calling "new" on this function
      this.getExpensesBySchoolId = function (schoolId) {
          var _activepromise = $q.defer();
          School.findOne({ filter: { where: { id: schoolId }, include: 'expensePayments' } },
              function (response) {
                  _activepromise.resolve(response);
              }, function (error) {
                  _activepromise.reject(error);
              });
          return _activepromise.promise;
      }
      this.getExistingExpenseRecords= function (data){
          var _activepromise = $q.defer();
          ExpensePayment.findOne({filter:{where:{expenseType:data.expenseType,description:data.description,schoolId:data.schoolId}}},
          function (response) {
                  _activepromise.resolve(response);
              }, function (error) {
                  _activepromise.reject(error);
              });
          return _activepromise.promise;

      } 
      this.CreateOrUpdateExpense= function (data){
          var _activepromise = $q.defer();
          ExpensePayment.create({expenseType:data.expenseType,date:data.date,amount:data.amount,description:data.description,schoolId:data.schoolId},
          function (response) {
                  _activepromise.resolve(response);
              }, function (error) {
                  _activepromise.reject(response);
              });
          return _activepromise.promise;

      } 
      this.deleteExpense = function (expenseId) {
          var _activepromise = $q.defer();
          ExpensePayment.deleteById({ id: expenseId }, function (response) { _activepromise.resolve(response) }, function (error) { _activepromise.reject(error) }); return _activepromise.promise;
      }
  });
