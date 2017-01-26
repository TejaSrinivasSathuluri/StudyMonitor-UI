'use strict';

/**
 * @ngdoc function
 * @name studymonitorApp.controller:ProfileControllerCtrl
 * @description
 * # ProfileControllerCtrl
 * Controller of the studymonitorApp
 */
angular.module('studymonitorApp')
  .controller('ProfileController', function ($cookies) {
      var ProfileCtrl = this;

      //Defaults
      ProfileCtrl.firstName = $cookies.getObject('uds').firstName;
      ProfileCtrl.lastName = $cookies.getObject('uds').lastName;
      ProfileCtrl.email = $cookies.getObject('uds').email;

  });
