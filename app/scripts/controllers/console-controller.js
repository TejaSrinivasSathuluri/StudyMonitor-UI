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
          }
      }
      (new init()).getNoticeDetails();


  });
