(function(){
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
          /*
              * Make an API call depends on user selected role
              * For Admin - authenticateAdmin
              * For Student - authenticateStudent
              * For Parent - authenticateParent
              * For Staff - authenticateStaff
              */
              if (role === 'Admin') {
                return $http.post(API_SERVER + '/Admins/login', data);
              }
              else if (role === 'Staff') {

              }
          //@@TODO - Remaining things are pending
        };

        this.getAuthenticateUserDetails = function (userID, accessToken) {
          return $http.get(API_SERVER + '/Admins/' + userID + '?access_token=' + accessToken)
        }
      });
})();
