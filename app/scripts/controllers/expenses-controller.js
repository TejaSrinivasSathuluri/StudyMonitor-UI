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
        //Defaults
        ExpensesCtrl.schoolId = $cookies.getObject('uds').schoolId;


        function init() {
            this.getExpenseRecords = function () {
                expensesService.getExpensesBySchoolId(ExpensesCtrl.schoolId).then(function (response) {
                    if (response && response.hasOwnProperty('expensePayments')) {
                        ExpensesCtrl.expensesList = response.expensePayments;

                        //Trigger the editable datatable
                        $timeout(function () {
                            var columnsDefs = [null, null, null, null, {
                                "orderable": false,
                                "width": "10%",
                                "targets": 0
                            }, {
                                    "orderable": false,
                                    "width": "10%",
                                    "targets": 0
                                }, {
                                    "orderable": false,
                                    "width": "10%",
                                    "targets": 0
                                }];
                            TableEditable.init("#expenses_datatable", columnsDefs);
                            Metronic.init();
                        });
                    }
                }, function (error) {
                    console.log('Error while fetching expense records. Error stack : ' + error);
                });
            }
        }

        (new init()).getExpenseRecords();
        //Close or Open modal
        ExpensesCtrl.closeModal = function () {
            var modal = $('#edit-expenses');
            modal.modal('hide');

            //ClearFields
            clearformfields();
        }
        ExpensesCtrl.openModal = function () {
            var modal = $('#edit-expenses');
            modal.modal('show');
        }
        //Clear Fields
        function clearformfields() {
            ExpensesCtrl.formFields = {};
        }
        // Add Action
        ExpensesCtrl.expenseAction = function (invalid) {
            if (invalid) {
                return;
            }
            var data = {
                schoolId: ExpensesCtrl.schoolId,
                expenseType: ExpensesCtrl.formFields.expenseType,
                description: ExpensesCtrl.formFields.description,
                date: ExpensesCtrl.formFields.date,
                amount: ExpensesCtrl.formFields.amount
            }
            if (data) {
                expensesService.getExistingExpenseRecords(data).then(function (result) {
                    if (result) {
                        console.log('data already exists');
                        return;
                    }
                }, function (result1) {
                    expensesService.CreateOrUpdateExpense(data).then(function (res) {
                        if (res) {
                            (new init()).getExpenseRecords();
                            ExpensesCtrl.closeModal();
                        }

                    }, function (error) {
                        console.log("Error while Fetching the Records" + error);
                    });
                });
            }
        }

    });
