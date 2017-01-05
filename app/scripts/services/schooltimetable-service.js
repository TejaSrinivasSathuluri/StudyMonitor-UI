'use strict';

/**
 * @ngdoc service
 * @name studymonitorApp.schooltimetableService
 * @description
 * # schooltimetableService
 * Service in the studymonitorApp.
 */
angular.module('studymonitorApp')
  .service('schooltimetableService', function ($q, Timetable) {
      // AngularJS will instantiate a singleton by calling "new" on this function
      this.getSchoolTimetableById = function (schoolId) {
          var _activepromise = $q.defer();
          Timetable.find({ filter: { where: { schoolId: schoolId }, include: 'schedules' } }, function (response) {
              _activepromise.resolve(response);
          }, function (error) {
              _activepromise.reject(error);
          });
          return _activepromise.promise;
      }
  });
