'use strict';

/**
 * @ngdoc service
 * @name studymonitorApp.mediauploadsService
 * @description
 * # mediauploadsService
 * Service in the studymonitorApp.
 */
angular.module('studymonitorApp')
  .service('mediauploadsService', function ($http, $q, API_SERVER, $cookies,School) {
    // AngularJS will instantiate a singleton by calling "new" on this function
     this.getMediaBySchoolId = function (schoolId) {
          var _activepromise = $q.defer();
          School.find({ filter: { where: { schoolId: schoolId } } }, function (response) {
              _activepromise.resolve(response);
          }, function (error) {
              _activepromise.reject(error);
          });
          return _activepromise.promise;
      }
  });
