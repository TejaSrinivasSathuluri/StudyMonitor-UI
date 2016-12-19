'use strict';

/**
 * @ngdoc function
 * @name studymonitorApp.controller:AssignmentsControllerCtrl
 * @description
 * # AssignmentsControllerCtrl
 * Controller of the studymonitorApp
 */
angular.module('studymonitorApp')
  .controller('AssignmentsController', function (assignmentsService, $cookies, $timeout) {
      var AssignmentsCtrl = this;

      function init() {
          //Get Assignment details by School ID
          AssignmentsCtrl.schoolId = $cookies.getObject('uds').schoolId;
          this.getAssignmentDetails = function () {
              assignmentsService.getAssignmentDetailsBySchoolId(AssignmentsCtrl.schoolId).then(function (result) {
                  if (result) {
                      AssignmentsCtrl.assignmentList = result;

                      $timeout(function () {
                          var columnsDefs = [null, null, {
                              "width": "30%"
                          }, null, null, {
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
                          TableEditable.init("#assignments_datatable", columnsDefs);
                      });
                  }
              }, function (error) {
                  console.log('Error while fetching the assignment records. Error stack : ' + error);
              });
          }
      }
      (new init()).getAssignmentDetails();
  });
