'use strict';

/**
 * @ngdoc function
 * @name studymonitorApp.controller:FeesControllerCtrl
 * @description
 * # FeesControllerCtrl
 * Controller of the studymonitorApp
 */
angular.module('studymonitorApp')
    .controller('FeesController', function (feesService, $cookies, $timeout) {
        var FeesCtrl = this;

        function Init() {
            FeesCtrl.schoolId = $cookies.getObject('uds').schoolId;
            //Get list of fees details by school ID
            this.getFeesDetails = function () {
                feesService.getFeesDetailsBySchoolId(FeesCtrl.schoolId).then(function (response) {
                    if (response) {
                        FeesCtrl.feesList = response;

                        $timeout(function () {
                            var columnsDefs = [null, null, null, null, null, {
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
                            TableEditable.init("#fees_datatable", columnsDefs);
                        });
                    }
                }, function (error) {
                    console.log('Error while fetching Fees details records. Error Stack : ' + error);
                });
            };
            this.getClassDetails = function () {
                feesService.getClassDetailsBySchoolId(FeesCtrl.schoolId).then(function (result) {
                    if (result) {
                        FeesCtrl.classList = result;
                    }
                }, function (error) {
                    console.log('Error while fetching the assignment records. Error stack : ' + error);
                });
            };
        }
        (new Init()).getFeesDetails();
        (new Init()).getClassDetails();
        //Close or Open modal
        FeesCtrl.closeModal = function () {
            var modal = $('#edit-fees');
            modal.modal('hide');

            //ClearFields
            clearformfields();
        };
        FeesCtrl.openModal = function () {
            var modal = $('#edit-fees');
            modal.modal('show');
        };
        //Clear Fields
        function clearformfields() {
            FeesCtrl.formFields = {};
        }
        //Delete confirmation box
        FeesCtrl.confirmCallbackMethod = function (index) {
            deleteFee(index);
        };
        //Delete cancel box
        FeesCtrl.confirmCallbackCancel = function (index) {
            if (index) {
                return false;
            }
            return;
        };
        // Add Action
        FeesCtrl.expenseAction = function (invalid) {
            if (invalid) {
                return;
            }
            var data = {
                schoolId: FeesCtrl.schoolId,
                occurance: FeesCtrl.formFields.occurance,
                classId: FeesCtrl.formFields.classId,
                feeType: FeesCtrl.formFields.feeType,
                amount: FeesCtrl.formFields.amount
            };
            if (data) {
                feesService.getExistingFeeRecords(data).then(function (result) {
                    if (result) {
                        console.log('data already exists');
                        return;
                    }
                }, function (result1) {
                    if (result1) {
                        feesService.CreateOrUpdateFee(data).then(function (res) {
                            if (res) {
                                (new Init()).getFeesDetails();
                                FeesCtrl.closeModal();
                            }

                        }, function (error) {
                            console.log("Error while Fetching the Records" + error);
                        });
                    }
                });
            }
        };
        //*********************************DELETE FEE******************************** */
        //Delete Action
        var deleteFee = function (index) {
            if (FeesCtrl.feesList) {
                feesService.deleteFee(FeesCtrl.feesList[index].id).then(function (result) {
                    if (result) {
                        //On Successfull refill the data list
                        (new Init()).getFeesDetails();
                        FeesCtrl.closeModal();
                    }
                }, function (error) {
                    console.log('Error while deleting class. Error Stack' + error);
                });
            }
        };
        //*********************************DELETE FEE******************************** */


    });
