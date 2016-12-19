'use strict';

/**
 * @ngdoc function
 * @name studymonitorApp.controller:SubjectsControllerCtrl
 * @description
 * # SubjectsControllerCtrl
 * Controller of the studymonitorApp
 */
angular.module('studymonitorApp')
  .controller('SubjectsController', function (subjectsService, $cookies, $timeout) {
      var SubjectsCtrl = this;

      function init() {
          SubjectsCtrl.schoolId = $cookies.getObject('uds').schoolId;
          this.fnSubjectList = function () {
              subjectsService.getSubjectListBySchoolId(SubjectsCtrl.schoolId).then(function (response) {
                  if (response) {
                      SubjectsCtrl.subjectList = response;

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
                          TableEditable.init("#subjects_datatable", columnsDefs);
                      });
                  }
              }, function (error) {
                  console.log('Error while fetching subject list . Error stack : ' + error);
              });
          }
      }
      (new init()).fnSubjectList();
  });
