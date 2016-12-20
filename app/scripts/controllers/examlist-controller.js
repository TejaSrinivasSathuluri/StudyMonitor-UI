'use strict';

/**
 * @ngdoc function
 * @name studymonitorApp.controller:ExamlistControllerCtrl
 * @description
 * # ExamlistControllerCtrl
 * Controller of the studymonitorApp
 */
angular.module('studymonitorApp')
  .controller('ExamlistController', function (examlistService, $timeout, $cookies) {
      var ExamlistCtrl = this;

      function init() {
          ExamlistCtrl.schoolId = $cookies.getObject('uds').schoolId;
          this.getExamList = function () {
              examlistService.getExamListBySchoolId(ExamlistCtrl.schoolId).then(function (result) {
                  if (result) {
                      ExamlistCtrl.examList = result;

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
                          TableEditable.init("#examlist_datatable", columnsDefs);
                      });
                  }
              }, function (error) {
                  console.log('Error while fetching records for Exams List. Error stack : ' + error);
              });
          }
      }
      (new init()).getExamList();
  });
