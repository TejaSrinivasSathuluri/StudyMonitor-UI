(function () {
    'use strict';

    /**
     * @ngdoc function
     * @name studymonitorApp.controller:TransportControllerCtrl
     * @description
     * # TransportControllerCtrl
     * Controller of the studymonitorApp
     */
    angular.module('studymonitorApp')
    .controller('TransportController', function (transportService, $timeout, $cookies) {
        var TransportCtrl = this;
        //Defaults
        TransportCtrl.editmode = false;
        TransportCtrl.formFields = {};

        function init() {
            //Get Transport details for schools
            TransportCtrl.schoolId = $cookies.getObject('uds').schoolId;
            this.getTransportDetailsForSchool = function () {
                transportService.getTransportDetailsBySchoolId(TransportCtrl.schoolId).then(function (result) {
                    if (result) {
                        TransportCtrl.transportList = result;
                    }
                }, function (error) {
                    console.log('Error while fecthing records for transport details. Error stack : ' + error);
                });
            }
        }
        (new init()).getTransportDetailsForSchool();
        $timeout(function () {
            var columnsDefs = [null, null, null, {
                'orderable': false,
                'width': '10%',
                'targets': 0
            }, {
                'orderable': false,
                'width': '10%',
                'targets': 0
            }];
            TableEditable.init('#transport_datatable', columnsDefs);
            Metronic.init();
        }, 1000);
        //Close or Open modal
        TransportCtrl.closeModal = function () {
            var modal = $('#edit-transport');
            modal.modal('hide');

            //ClearFields
            clearformfields();
        }
        TransportCtrl.openModal = function () {
            var modal = $('#edit-transport');
            modal.modal('show');
        }
        //Clear Fields
        function clearformfields() {
            TransportCtrl.formFields = {};
        }
        //Delete confirmation box
        TransportCtrl.confirmCallbackMethod = function (index) {
            deleteBus(index);
        }
        //Delete cancel box
        TransportCtrl.confirmCallbackCancel = function (index) {
            return false;
        }
        // Add Action
        TransportCtrl.transportAction = function (invalid) {
            if (invalid) {
                return;
            }
            var data = {
                schoolId: TransportCtrl.schoolId,
                busNo: TransportCtrl.formFields.busNo,
                busType: TransportCtrl.formFields.busType,
                busCapacity: TransportCtrl.formFields.busCapacity
            }
            if (data) {
                if (!TransportCtrl.editmode) {
                    transportService.getExistingBusRecords(data).then(function (result) {
                        if (result) {
                            console.log('data already exists');
                            return;
                        }
                    }, function (result1) {
                        transportService.CreateOrUpdateBus(data).then(function (res) {
                            if (res) {
                                (new init()).getTransportDetailsForSchool();
                                TransportCtrl.closeModal();
                            }

                        }, function (error) {
                            console.log('Error while Fetching the Records' + error);
                        });
                    });
                }
                else {
                    data.id = TransportCtrl.id;
                    transportService.updateTransport(data).then(function (result) {
                        if (result) {
                            (new init()).getTransportDetailsForSchool();
                            TransportCtrl.closeModal();
                        }
                    }, function (error) {
                        if (error) {
                            console.log('Error while updating transport records. Error stack ' + error);
                        }
                    });
                }
            }
        }
        //Delete Action
        var deleteBus = function (index) {
            if (TransportCtrl.transportList) {
                transportService.deleteBus(TransportCtrl.transportList[index].id).then(function (result) {
                    if (result) {
                        //On Successfull refill the data list
                        (new init()).getTransportDetailsForSchool();
                        TransportCtrl.closeModal();
                    }
                }, function (error) {
                    console.log('Error while deleting class. Error Stack' + error);
                });
            }
        }
        //Setting up float label
        TransportCtrl.setFloatLabel = function () {
            Metronic.setFlotLabel($('input[name=busNo]'));
            Metronic.setFlotLabel($('input[name=busType]'));
            Metronic.setFlotLabel($('input[name=busCapacity]'));
        };
        /* ================ Edit Transport ======================= */
        TransportCtrl.editTransport = function (index) {
            TransportCtrl.formFields.busNo = TransportCtrl.transportList[index].busNo;
            TransportCtrl.formFields.busType = TransportCtrl.transportList[index].busType;
            TransportCtrl.formFields.busCapacity = TransportCtrl.transportList[index].busCapacity;
            TransportCtrl.id = TransportCtrl.transportList[index].id;

            //Open Modal
            TransportCtrl.openModal();

            $timeout(function () {
                TransportCtrl.setFloatLabel();
                TransportCtrl.editmode = true;
            });
        }
        /* ================ Edit Transport End =================== */
    });
})();