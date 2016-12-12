'use strict';

/**
 * @ngdoc service
 * @name studymonitorApp.subjectsService
 * @description
 * # subjectsService
 * Service in the studymonitorApp.
 */
angular.module('studymonitorApp')
  .service('subjectsService', function ($q, Subject) {
      // AngularJS will instantiate a singleton by calling "new" on this function
      this.getSubjectListBySchoolId = function (schoolId) {
          var _activepromise = $q.defer();
          Subject.find({ filter: { where: { schoolId: schoolId }, include: ['staff', 'class'] } }, function (response) {
              _activepromise.resolve(response);
          }, function (error) {
              _activepromise.reject(error);
          });
          return _activepromise.promise;
      }
  });
