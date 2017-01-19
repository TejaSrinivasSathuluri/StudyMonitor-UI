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

          function init() {
              //Get Transport details for schools
              TransportCtrl.schoolId = $cookies.getObject('uds').schoolId;
              this.getTransportDetailsForSchool = function () {
                  transportService.getTransportDetailsBySchoolId(TransportCtrl.schoolId).then(function (result) {
                      if (result) {
                          TransportCtrl.transportList = result;

                          $timeout(function () {
                              var columnsDefs = [null, null, null, {
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
                              TableEditable.init("#transport_datatable", columnsDefs);
                          });
                      }
                  }, function (error) {
                      console.log('Error while fecthing records for transport details. Error stack : ' + error);
                  });
              }
          }
          (new init()).getTransportDetailsForSchool();
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
                        console.log("Error while Fetching the Records" + error);
                    });
                });
            }
        }
      });
})();
