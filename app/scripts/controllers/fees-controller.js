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

      function init() {
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
          }
      }
      (new init()).getFeesDetails();
  });
