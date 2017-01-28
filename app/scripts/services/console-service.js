'use strict';

/**
 * @ngdoc service
 * @name studymonitorApp.consoleService
 * @description
 * # consoleService
 * Service in the studymonitorApp.
 */
angular.module('studymonitorApp')
  .service('consoleService', function ($q, Noticeboard,Assignment,Exam) {
    // AngularJS will instantiate a singleton by calling "new" on this function
      this.getNoticeDetailsBySchoolId = function (schoolId) {
          var _activepromise = $q.defer();
          Noticeboard.find({ filter: { where: { schoolId: schoolId } } }, function (response) {
              _activepromise.resolve(response);
          }, function (error) {
              _activepromise.reject(error);
          });
          return _activepromise.promise;
      }
      this.getExamListBySchoolId = function (schoolId) {
          var _activepromise = $q.defer();
          Exam.find({ filter: { where: { schoolId: schoolId }, include: 'class' } }, function (response) {
              _activepromise.resolve(response);
          }, function (error) {
              _activepromise.reject(error);
          });
          return _activepromise.promise;
      }
      this.getAssignmentDetailsBySchoolId = function (schoolId) {
            var _activepromise = $q.defer();
            Assignment.find({ filter: { where: { schoolId: schoolId }, include: 'class' } }, function (response) {
                _activepromise.resolve(response);
            }, function (error) {
                _activepromise.reject(error);
            });
            return _activepromise.promise;
        }
        
  });