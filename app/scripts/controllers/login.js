'use strict';

/**
 * @ngdoc function
 * @name studymonitorApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the studymonitorApp
 */
angular.module('studymonitorApp')
  .controller('LoginController', function (loginService, $timeout, $cookies, APP_MESSAGES, $state) {
      var LoginCtrl = this;


      //@@TODO - Clear the below lines while production
      $timeout(function () {
          LoginCtrl.loginfields = {};
          LoginCtrl.loginfields.username = 'admin@studymonitor.com';
          LoginCtrl.loginfields.password = 'admin';
      });
      //@@TODO - Clear the above lines in prod

      LoginCtrl.authenticateUser = function (invalid) {
          if (invalid) {
              return;
          }
          var data = {
              "email": LoginCtrl.loginfields.username,
              "password": LoginCtrl.loginfields.password
          };

          if (data) {
              if (LoginCtrl.loginfields.role) {
                  //Make an API Call to authentical
                  //Params @email,@password and @role
                  loginService.authenticateUser(data, LoginCtrl.loginfields.role).then(function (response) {
                      if (response) {
                          $cookies.put('uds', {
                              accessToken: response.id,
                              userId: response.userId
                          });
                          $state.go('console');
                      }
                  }, function (error) {
                      if (error) {
                          if (error.error.status === 401) {
                              LoginCtrl.showError = true;
                              LoginCtrl.errorMessage = APP_MESSAGES.LOGIN_INVALID;
                          }
                      }
                  });
              }
          }

      }
  });
