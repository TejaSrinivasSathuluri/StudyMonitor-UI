'use strict';

/**
 * @ngdoc service
 * @name studymonitorApp.loginService
 * @description
 * # loginService
 * Service in the studymonitorApp.
 */
angular.module('studymonitorApp')
  .service('loginService', function ($http, $q, API_SERVER) {
      // AngularJS will instantiate a singleton by calling "new" on this function
      this.authenticateUser = function (data, role) {
          var _activepromise = $q.defer();
          /*
              * Make an API call depends on user selected role
              * For Admin - authenticateAdmin
              * For Student - authenticateStudent
              * For Parent - authenticateParent
              * For Staff - authenticateStaff
              */
          if (role === 'Admin') {
              $http.post(API_SERVER + '/Admins/login', data).success(function (response) {
                  _activepromise.resolve(response);
              })
              .error(function (error) {
                  _activepromise.reject(error);
              });
          }
          else if (role === 'Staff') {

          }
          //@@TODO - Remaining things are pending
          return _activepromise.promise;
      };

      this.getAuthenticateUserDetails = function (userID, accessToken) {
          var _activepromise = $q.defer();
          $http.get(API_SERVER + '/Admins/' + userID + '?access_token=' + accessToken).success(function (response) {
              _activepromise.resolve(response);
          })
          .error(function (error) {
              _activepromise.reject(error);
          });
          return _activepromise.promise;
      }
  });
