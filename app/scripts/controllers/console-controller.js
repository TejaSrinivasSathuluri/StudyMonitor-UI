'use strict';

/**
 * @ngdoc function
 * @name studymonitorApp.controller:ConsoleControllerCtrl
 * @description
 * # ConsoleControllerCtrl
 * Controller of the studymonitorApp
 */
angular.module('studymonitorApp')
  .controller('ConsoleController', function (consoleService,$cookies, $state) {
      var ConsoleCtrl = this;

      ConsoleCtrl.logout = function () {
          //Clear the cookies and navigate to login
          $cookies.remove('uds');
          $state.go('login');
      }
      ConsoleCtrl.schoolId = $cookies.getObject('uds').schoolId;
      
      function init() {
          this.getNoticeDetails = function () {
              consoleService.getNoticeDetailsBySchoolId(ConsoleCtrl.schoolId).then(function (result) {
                  if (result) {
                      ConsoleCtrl.noticeList = result;

                      $('#noticescroller').slimScroll({
                          position: 'right',
                          height: '350px',
                          railVisible: true,
                          alwaysVisible: false,
                          handleColor: '#D7DCE2'

                      });
                  }
              }, function (error) {
                  console.log('Error while fetching notice details. Error stack : ' + error);
              });
          };
          this.getExamDetails = function () {
              consoleService.getExamListBySchoolId(ConsoleCtrl.schoolId).then(function (result) {
                  if (result) {
                      ConsoleCtrl.examList = result;

                      $('#examscroller').slimScroll({
                          position: 'right',
                          height: '350px',
                          railVisible: true,
                          alwaysVisible: false,
                          handleColor: '#D7DCE2'

                      });
                  }
              }, function (error) {
                  console.log('Error while fetching exam details. Error stack : ' + error);
              });
          };
          this.getAssignmentDetails = function () {
              consoleService.getAssignmentDetailsBySchoolId(ConsoleCtrl.schoolId).then(function (result) {
                  if (result) {
                      ConsoleCtrl.assignmentList = result;

                      $('#assignmentscroller').slimScroll({
                          position: 'right',
                          height: '350px',
                          railVisible: true,
                          alwaysVisible: false,
                          handleColor: '#D7DCE2'

                      });
                  }
              }, function (error) {
                  console.log('Error while fetching assignment details. Error stack : ' + error);
              });
          };

      }
      (new init()).getNoticeDetails();
      (new init()).getExamDetails();
      (new init()).getAssignmentDetails();


  });
