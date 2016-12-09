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
          var _activepromise = $q.defer();

          $http.get(API_SERVER + '/Schools/' + schoolId + '/classes?access_token=' + $cookies.getObject('uts').accessToken).success(function (response) {
              _activepromise.resolve(response);
          }).error(function (error) {
              _activepromise.reject(error);
          });
          return _activepromise.promise;
      };
      this.getClassTeacherByID = function (staffId) {
          var _activepromise = $q.defer();

          $http.get(API_SERVER + '/Staffs/' + staffId + '?access_token=' + $cookies.getObject('uts').accessToken).success(function (response) {
              _activepromise.resolve(response);
          }).error(function (error) {
              _activepromise.reject(error);
          });
          return _activepromise.promise;
      };
  });
