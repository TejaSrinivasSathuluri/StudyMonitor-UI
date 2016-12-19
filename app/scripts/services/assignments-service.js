'use strict';

/**
 * @ngdoc service
 * @name studymonitorApp.assignmentsService
 * @description
 * # assignmentsService
 * Service in the studymonitorApp.
 */
angular.module('studymonitorApp')
  .service('assignmentsService', function ($q, Assignment) {
      // AngularJS will instantiate a singleton by calling "new" on this function
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
