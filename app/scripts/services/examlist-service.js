'use strict';

/**
 * @ngdoc service
 * @name studymonitorApp.examlistService
 * @description
 * # examlistService
 * Service in the studymonitorApp.
 */
angular.module('studymonitorApp')
  .service('examlistService', function ($q, Exam) {
      // AngularJS will instantiate a singleton by calling "new" on this function
      this.getExamListBySchoolId = function (schoolId) {
          var _activepromise = $q.defer();
          Exam.find({ filter: { where: { schoolId: schoolId }, include: 'class' } }, function (response) {
              _activepromise.resolve(response);
          }, function (error) {
              _activepromise.reject(error);
          });
          return _activepromise.promise;
      }
  });
