'use strict';

/**
 * @ngdoc function
 * @name studymonitorApp.controller:BussubscriptionControllerCtrl
 * @description
 * # BussubscriptionControllerCtrl
 * Controller of the studymonitorApp
 */
angular.module('studymonitorApp')
    .controller('BussubscriptionController', function (BussubscriptionService, $cookies, $timeout) {
        var BussubscriptionCtrl = this;
        //defaults
        BussubscriptionCtrl.value = null;
        //Get Bussubscription details by School ID
        BussubscriptionCtrl.schoolId = $cookies.getObject('uds').schoolId;

        function Init() {

            this.getBussubscriptionDetails = function () {
                BussubscriptionService.getBussubscriptionDetailsBySchoolId(BussubscriptionCtrl.schoolId).then(function (result) {
                    if (result) {
                        BussubscriptionCtrl.bussubscriptionList = result;
                    }
                }, function (error) {
                    console.log('Error while fetching the Bussubscription records. Error stack : ' + error);
                });
            };
            this.getClassDetails = function () {
                BussubscriptionService.getClassDetailsBySchoolId(BussubscriptionCtrl.schoolId).then(function (result) {
                    if (result) {
                        BussubscriptionCtrl.classList = result;
                    }
                }, function (error) {
                    console.log('Error while fetching the Bussubscription records. Error stack : ' + error);
                });
            };
            this.getStudentDetails = function () {
                BussubscriptionService.getStudentDetailsBySchoolId(BussubscriptionCtrl.schoolId).then(function (result) {
                    if (result) {
                        BussubscriptionCtrl.studentList = result;
                    }
                }, function (error) {
                    console.log('Error while fetching the Bussubscription records. Error stack : ' + error);
                });
            };
            this.getBusserviceDetails = function () {
                BussubscriptionService.getBusserviceDetailsBySchoolId(BussubscriptionCtrl.schoolId).then(function (result) {
                    if (result) {
                        BussubscriptionCtrl.busserviceList = result;
                        console.log(result);
                    }
                }, function (error) {
                    console.log('Error while fetching the Bussubscription records. Error stack : ' + error);
                });
            }
        }
        (new Init()).getBussubscriptionDetails();
        (new Init()).getBusserviceDetails();
        (new Init()).getClassDetails();
        (new Init()).getStudentDetails();
        //Initialize the Table Component
        $timeout(function () {
            var columnsDefs = [null, null, null, {
                'width': '30%'
            }, null, {
                    'orderable': false,
                    'width': '10%',
                    'targets': 0
                }];
            TableEditable.init('#bussubscription_datatable', columnsDefs);
            Metronic.init();
        }, 1000);
        //Close or Open modal
        BussubscriptionCtrl.closeModal = function () {
            var modal = $('#edit-bussubscription');
            modal.modal('hide');

            //ClearFields
            clearformfields();
        };
        BussubscriptionCtrl.openModal = function () {
            var modal = $('#edit-bussubscription');
            modal.modal('show');
        };
        //Clear Fields
        function clearformfields() {
            BussubscriptionCtrl.formFields = {};
        }
        //Delete confirmation box
        BussubscriptionCtrl.confirmCallbackMethod = function (index) {
            deleteBussubscription(index);
        };
        //Delete cancel box
        BussubscriptionCtrl.confirmCallbackCancel = function () {
            return false;
        };
        // Add Action
        BussubscriptionCtrl.BussubscriptionAction = function (invalid) {
            if (invalid) {
                return;
            }
            var data = {
                schoolId: BussubscriptionCtrl.schoolId,
                busServiceId: BussubscriptionCtrl.formFields.busServiceId,
                studentId: BussubscriptionCtrl.formFields.studentId,
                pickupLocation: BussubscriptionCtrl.formFields.pickupLocation
            };
            if (data) {
                BussubscriptionService.getExistingBussubscriptionRecords(data).then(function (result) {
                    if (result) {
                        console.log('data already exists');
                        return;
                    }
                }, function (result1) {
                    if (result1) {
                        BussubscriptionService.CreateOrUpdateBussubscription(data).then(function (res) {
                            if (res) {
                                (new Init()).getBussubscriptionDetails();
                                BussubscriptionCtrl.closeModal();
                            }

                        }, function (error) {
                            console.log('Error while Fetching the Records' + error);
                        });
                    }
                });
            }
        };
        //Delete Action
        var deleteBussubscription = function (index) {
            if (BussubscriptionCtrl.bussubscriptionList) {
                BussubscriptionService.deleteBussubscription(BussubscriptionCtrl.bussubscriptionList[index].id).then(function (result) {
                    if (result) {
                        //On Successfull refill the data list
                        (new Init()).getBussubscriptionDetails();
                        BussubscriptionCtrl.closeModal();
                    }
                }, function (error) {
                    console.log('Error while deleting Bussubscription. Error Stack' + error);
                });
            }
        };
    });