'use strict';

/**
 * @ngdoc function
 * @name studymonitorApp.controller:ConsoleControllerCtrl
 * @description
 * # ConsoleControllerCtrl
 * Controller of the studymonitorApp
 */
angular.module('studymonitorApp')
  .controller('ConsoleController', function ($cookies, $state) {
      var ConsoleCtrl = this;

      ConsoleCtrl.logout = function () {
          //Clear the cookies and navigate to login
          $cookies.remove('uds');
          $state.go('login');
      }
  });
