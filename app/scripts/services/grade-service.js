'use strict';

/**
 * @ngdoc service
 * @name studymonitorApp.gradeService
 * @description
 * # gradeService
 * Service in the studymonitorApp.
 */
angular.module('studymonitorApp')
  .service('gradeService', function ($q, Grade) {
      // AngularJS will instantiate a singleton by calling "new" on this function
      this.getGradesListBySchoolId = function (schoolId) {
          var _activepromise = $q.defer();
          Grade.find({ filter: { where: { schoolId: schoolId } } }, function (response) {
              _activepromise.resolve(response);
          }, function (error) {
              _activepromise.reject(error);
          });
          return _activepromise.promise;
      }
  });
