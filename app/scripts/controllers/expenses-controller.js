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
        ExpensesCtrl.formFields = {};
        ExpensesCtrl.editmode = false;
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
                        }, 1000);
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
        //Delete confirmation box
        ExpensesCtrl.confirmCallbackMethod = function (index) {
            deleteExpense(index);
        }
        //Delete cancel box
        ExpensesCtrl.confirmCallbackCancel = function (index) {
            return false;
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

                //Check whether editmode or normal mode
                if (!ExpensesCtrl.editmode) {
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
                                //Show Toast Message Success
                                toastr.success(APP_MESSAGES.INSERT_SUCCESS);
                            }

                        }, function (error) {
                            console.log("Error while Fetching the Records" + error);
                        });
                    });
                }
                else {
                    data.id = ExpensesCtrl.editingExpenseId;
                    expensesService.editExpense(data).then(function (result) {
                        if (result) {
                            //On Successfull refill the data list
                            init();
                            //Close Modal
                            ExpensesCtrl.closeModal();
                            //Show Toast Message Success
                            toastr.success(APP_MESSAGES.UPDATE_SUCCESS);
                        }
                    }, function (error) {
                        toastr.error(error, APP_MESSAGES.SERVER_ERROR);
                        console.log('Error while creating or updating records. Error stack' + error);
                    });
                }
            }

        }
        //Delete Action
        var deleteExpense = function (index) {
            if (ExpensesCtrl.expensesList) {
                expensesService.deleteExpense(ExpensesCtrl.expensesList[index].id).then(function (result) {
                    if (result) {
                        //On Successfull refill the data list
                        (new init()).getExpenseRecords();
                        ExpensesCtrl.closeModal();
                    }
                }, function (error) {
                    console.log('Error while deleting expense. Error Stack' + error);
                });
            }
        }
        //Edit Action
        ExpensesCtrl.editExpense = function (index) {
            ExpensesCtrl.formFields.expenseType = ExpensesCtrl.expensesList[index].expenseType;
            ExpensesCtrl.formFields.description = ExpensesCtrl.expensesList[index].description;
            ExpensesCtrl.formFields.date = ExpensesCtrl.expensesList[index].date;
            ExpensesCtrl.formFields.amount = ExpensesCtrl.expensesList[index].amount;
            ExpensesCtrl.editingExpenseId = ExpensesCtrl.expensesList[index].id;
            //Open Modal
            ExpensesCtrl.openModal();

            $timeout(function () {

                ExpensesCtrl.setFloatLabel();
                //Enable Edit Mode
                ExpensesCtrl.editmode = true;
            });

        }
        //Setting up float label
        ExpensesCtrl.setFloatLabel = function () {
            Metronic.setFlotLabel($('input[name=expensetype]'));
            Metronic.setFlotLabel($('input[name=description]'));
            Metronic.setFlotLabel($('input[name=date]'));
            Metronic.setFlotLabel($('input[name=amount]'));
        }

        //Calendar Fix @@TODO Move this to directive
        $(".calendarctrl").on("dp.change", function () {
            ExpensesCtrl.formFields.date = $(this).val();
        });

    });
