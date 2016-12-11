'use strict';

/**
 * @ngdoc service
 * @name studymonitorApp.classService
 * @description
 * # classService
 * Service in the studymonitorApp.
 */
angular.module('studymonitorApp')
  .service('classService', function ($http, $q, API_SERVER, $cookies) {
      // AngularJS will instantiate a singleton by calling "new" on this function
      this.getClassDetails = function (schoolId) {
          return $http.get(API_SERVER + '/Schools/' + schoolId + '/classes?access_token=' + $cookies.getObject('uts').accessToken);
      };
      this.getClassTeacherByID = function (staffId) {
          return $http.get(API_SERVER + '/Staffs/' + staffId + '?access_token=' + $cookies.getObject('uts').accessToken);
      };
      this.getStaffBySchoolID = function (schoolId) {
          return $http.get(API_SERVER + '/Schools/' + schoolId + '/staffs?access_token=' + $cookies.getObject('uts').accessToken);
      }
  });
