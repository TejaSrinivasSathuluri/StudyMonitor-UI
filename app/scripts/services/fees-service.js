'use strict';

/**
 * @ngdoc service
 * @name studymonitorApp.feesService
 * @description
 * # feesService
 * Service in the studymonitorApp.
 */
angular.module('studymonitorApp')
  .service('feesService', function ($q, FeeSetup) {
      // AngularJS will instantiate a singleton by calling "new" on this function
      this.getFeesDetailsBySchoolId = function (schoolId) {
          var _activepromise = $q.defer();
          FeeSetup.find({ filter: { where: { schoolId: schoolId }, include: 'class' } }, function (response) {
              _activepromise.resolve(response);
          }, function (error) {
              _activepromise.reject(error);
          });
          return _activepromise.promise;
      }
  });
