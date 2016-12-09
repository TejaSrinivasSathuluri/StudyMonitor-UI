'use strict';

/**
 * @ngdoc function
 * @name studymonitorApp.controller:ClassControllerCtrl
 * @description
 * # ClassControllerCtrl
 * Controller of the studymonitorApp
 */
angular.module('studymonitorApp')
  .controller('ClassController', function ($log, $timeout, classService, APP_MESSAGES, $cookies, $state) {
      var ClassCtrl = this;

      function init() {
          //var GetClassDetails = function () {
          var schoolId = $cookies.getObject('uds').schoolId;
          classService.getClassDetails(schoolId).then(function (result) {
              if (result) {
                  if (result.length > 0) {
                      ClassCtrl.classList = result;
                  }
              }
          }, function (error) {
              if (error) {
                  console.log(error);
              }
          });
          //}
      }
      init();
  });
