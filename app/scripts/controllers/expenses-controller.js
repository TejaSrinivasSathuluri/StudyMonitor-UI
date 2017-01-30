'use strict';

/**
 * @ngdoc function
 * @name studymonitorApp.controller:ExpensesControllerCtrl
 * @description
 * # ExpensesControllerCtrl
 * Controller of the studymonitorApp
 */
angular.module('studymonitorApp')
    .controller('ExpensesController', function (expensesService, $cookies, $timeout, toastr, APP_MESSAGES) {
        var ExpensesCtrl = this;
        ExpensesCtrl.formFields = {};
        ExpensesCtrl.editmode = false;
        ExpensesCtrl.detailsMode = false;
        ExpensesCtrl.viewValue = {};
        ExpensesCtrl.innerHTML = {};
        //Defaults
        ExpensesCtrl.schoolId = $cookies.getObject('uds').schoolId;


        function Init() {
            this.getExpenseRecords = function () {
                expensesService.getExpensesBySchoolId(ExpensesCtrl.schoolId).then(function (response) {
                    if (response && response.hasOwnProperty('expensePayments')) {
                        ExpensesCtrl.expensesList = response.expensePayments;
                    }
                }, function (error) {
                    console.log('Error while fetching expense records. Error stack : ' + error);
                });
            };
        }
        (new Init()).getExpenseRecords();
        //Trigger the editable datatable
        $timeout(function () {
            var columnsDefs = [null, null, null, null, {
                'orderable': false,
                'width': '10%',
                'targets': 0
            }, {
                    'orderable': false,
                    'width': '10%',
                    'targets': 0
                }, {
                    'orderable': false,
                    'width': '10%',
                    'targets': 0
                }];
            TableEditable.init('#expenses_datatable', columnsDefs);
            Metronic.init();
        }, 1000);
        //Close or Open modal
        ExpensesCtrl.closeModal = function () {
            var modal = $('#edit-expenses');
            modal.modal('hide');

            //ClearFields
            clearformfields();
        };
        ExpensesCtrl.openModal = function () {
            var modal = $('#edit-expenses');
            modal.modal('show');
        };
        //Clear Fields
        function clearformfields() {
            ExpensesCtrl.formFields = {};
        }
        //Delete confirmation box
        ExpensesCtrl.confirmCallbackMethod = function (index) {
            deleteExpense(index);
        };
        //Delete cancel box
        ExpensesCtrl.confirmCallbackCancel = function (index) {
            if (index) {
                return false;
            }
            return;
        };
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
            };
            if (data) {

                //Check whether editmode or normal mode
                if (!ExpensesCtrl.editmode) {
                    expensesService.getExistingExpenseRecords(data).then(function (result) {
                        if (result) {
                            toastr.error(APP_MESSAGES.DATA_EXISTS_DESC, APP_MESSAGES.DATA_EXISTS);
                            console.log('data already exists');
                            return;
                        }
                    }, function (result1) {
                        if (result1) {
                            expensesService.CreateOrUpdateExpense(data).then(function (res) {
                                if (res) {
                                    (new Init()).getExpenseRecords();
                                    ExpensesCtrl.closeModal();
                                    //Show Toast Message Success
                                    toastr.success(APP_MESSAGES.INSERT_SUCCESS);
                                }

                            }, function (error) {
                                console.log('Error while Fetching the Records' + error);
                            });
                        }
                    });
                }
                else {
                    data.id = ExpensesCtrl.editingExpenseId;
                    expensesService.editExpense(data).then(function (result) {
                        if (result) {
                            //On Successfull refill the data list
                            (new Init()).getExpenseRecords();
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

        };
        //Delete Action
        var deleteExpense = function (index) {
            if (ExpensesCtrl.expensesList) {
                expensesService.deleteExpense(ExpensesCtrl.expensesList[index].id).then(function (result) {
                    if (result) {
                        //On Successfull refill the data list
                        (new Init()).getExpenseRecords();
                        ExpensesCtrl.closeModal();
                        //Show Toast Message Success
                        toastr.success(APP_MESSAGES.DELETE_SUCCESS);
                    }
                }, function (error) {
                    toastr.error(error, APP_MESSAGES.SERVER_ERROR);
                    console.log('Error while deleting expense. Error Stack' + error);
                });
            }
        };
        //Edit Action
        ExpensesCtrl.editExpense = function (index) {
            ExpensesCtrl.formFields.expenseType = ExpensesCtrl.expensesList[index].expenseType;
            ExpensesCtrl.formFields.description = ExpensesCtrl.expensesList[index].description;
            ExpensesCtrl.formFields.date = ExpensesCtrl.expensesList[index].date;
            ExpensesCtrl.formFields.amount = ExpensesCtrl.expensesList[index].amount;
            ExpensesCtrl.editingExpenseId = ExpensesCtrl.expensesList[index].id;
            //Set View Mode false
            ExpensesCtrl.detailsMode = false;
            //Open Modal
            ExpensesCtrl.openModal();

            $timeout(function () {

                ExpensesCtrl.setFloatLabel();
                //Enable Edit Mode
                ExpensesCtrl.editmode = true;
            });

        };
        //Setting up float label
        ExpensesCtrl.setFloatLabel = function () {
            Metronic.setFlotLabel($('input[name=expensetype]'));
            Metronic.setFlotLabel($('input[name=description]'));
            Metronic.setFlotLabel($('input[name=date]'));
            Metronic.setFlotLabel($('input[name=amount]'));
        };

        //Calendar Fix @@TODO Move this to directive
        $('.calendarctrl').on('dp.change', function () {
            ExpensesCtrl.formFields.date = $(this).val();
        });
        //More Details
        ExpensesCtrl.moreDetails = function (index) {
            ExpensesCtrl.detailsMode = true;
            ExpensesCtrl.openModal();
            ExpensesCtrl.viewValue = ExpensesCtrl.expensesList[index];

        };
        ExpensesCtrl.printToCart = function (printSectionId) {
            var innerContents = document.getElementById(printSectionId);
            var popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
            popupWinindow.document.open();
            popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + innerContents + '</html>');
            popupWinindow.document.close();
        };

    });
