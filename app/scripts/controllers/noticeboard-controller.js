'use strict';

/**
 * @ngdoc function
 * @name studymonitorApp.controller:NoticeboardControllerCtrl
 * @description
 * # NoticeboardControllerCtrl
 * Controller of the studymonitorApp
 */
angular.module('studymonitorApp')
  .controller('NoticeboardController', function (noticeboardService, $cookies, $timeout) {
      var NoticeboardCtrl = this;
      NoticeboardCtrl.schoolId = $cookies.getObject('uds').schoolId;
      function init() {
          this.getNoticeDetails = function () {
              noticeboardService.getNoticeDetailsBySchoolId(NoticeboardCtrl.schoolId).then(function (result) {
                  if (result) {
                      NoticeboardCtrl.noticeList = result;
                  }
              }, function (error) {
                  console.log('Error while fetching notice details. Error stack : ' + error);
              });
          }
      }
      (new init()).getNoticeDetails();
  });
