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
      });
})();
