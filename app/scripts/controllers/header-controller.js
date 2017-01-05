'use strict';

/**
 * @ngdoc function
 * @name studymonitorApp.controller:HeaderControllerCtrl
 * @description
 * # HeaderControllerCtrl
 * Controller of the studymonitorApp
 */
angular.module('studymonitorApp')
  .controller('HeaderController', function ($cookies, $state) {
      var HeaderCtrl = this;

      /*
       * Logout screen and clear all cookies values
       */
      HeaderCtrl.logout = function () {
          //Clear the cookies and navigate to login
          $cookies.remove('uds');
          $cookies.remove('uts');
          $state.go('login');
      }
      /*
       * Initialize the controller
       */
      function init() {
          this.getSchoolLogo = function () {
              var schoolDetails = $cookies.getObject('__s');
              if (!angular.equals({}, schoolDetails)) {
                  HeaderCtrl.schoolLogo = schoolDetails.image;
              }
          }
      }
      (new init()).getSchoolLogo();
  });
