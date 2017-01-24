'use strict';

/**
 * @ngdoc service
 * @name studymonitorApp.classtimetableService
 * @description
 * # classtimetableService
 * Service in the studymonitorApp.
 */
angular.module('studymonitorApp')
  .service('classtimetableService', function ($q, Schedule, Timetable, Class) {
    // AngularJS will instantiate a singleton by calling "new" on this function
   
        this.getClasstimetableDetailsBySchoolId = function (schoolId) {
            var _activepromise = $q.defer();
            Timetable.find({ filter: { where: { schoolId: schoolId }, include: 'class' } }, function (response) {
                _activepromise.resolve(response);
            }, function (error) {
                _activepromise.reject(error);
            });
            return _activepromise.promise;
        }
        this.getClassDetailsBySchoolId = function (schoolId) {
            var _activepromise = $q.defer();
            Class.find({ filter: { where: { schoolId: schoolId } } }, function (response) {
                _activepromise.resolve(response);
            }, function (error) {
                _activepromise.reject(error);
            });
            return _activepromise.promise;
        }
  });
