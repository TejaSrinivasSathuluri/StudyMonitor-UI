'use strict';

/**
 * @ngdoc service
 * @name studymonitorApp.noticeboardService
 * @description
 * # noticeboardService
 * Service in the studymonitorApp.
 */
angular.module('studymonitorApp')
  .service('noticeboardService', function ($q, Noticeboard) {
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
  });
