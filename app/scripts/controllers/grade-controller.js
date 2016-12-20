'use strict';

/**
 * @ngdoc function
 * @name studymonitorApp.controller:GradeControllerCtrl
 * @description
 * # GradeControllerCtrl
 * Controller of the studymonitorApp
 */
angular.module('studymonitorApp')
  .controller('GradeController', function (gradeService, $timeout, $cookies) {
      var GradeCtrl = this;
      function init() {
          GradeCtrl.schoolId = $cookies.getObject('uds').schoolId;
          this.getGradeList = function () {
              gradeService.getGradesListBySchoolId(GradeCtrl.schoolId).then(function (result) {
                  if (result) {
                      GradeCtrl.gradelist = result;
                  }
              }, function (error) {
                  console.log('Error while fecthing records for Grade. Error stack : ' + error);
              });
          }
      }
      (new init()).getGradeList();
  });
