'use strict';

/**
 * @ngdoc function
 * @name studymonitorApp.controller:ClassupgradeControllerCtrl
 * @description
 * # ClassupgradeControllerCtrl
 * Controller of the studymonitorApp
 */
angular.module('studymonitorApp')
  .controller('ClassupgradeController', function (classupgradeService, $cookies) {
      var ClassUpgradeCtrl = this;
      //Get Assignment details by School ID
        ClassUpgradeCtrl.schoolId = $cookies.getObject('uds').schoolId;
      function Init() {

          this.getClassDetails = function () {
              classupgradeService.getClassDetailsBySchoolId(ClassUpgradeCtrl.schoolId).then(function (result) {
                  if (result) {
                      ClassUpgradeCtrl.classList = result;
                  }
              }, function (error) {
                  console.log('Error while fetching the assignment records. Error stack : ' + error);
              });
          };
        }
        
        (new Init()).getClassDetails();
  });
