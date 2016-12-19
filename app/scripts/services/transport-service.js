'use strict';

/**
 * @ngdoc service
 * @name studymonitorApp.transportService
 * @description
 * # transportService
 * Service in the studymonitorApp.
 */
angular.module('studymonitorApp')
  .service('transportService', function ($q, Bus) {
      // AngularJS will instantiate a singleton by calling "new" on this function
      this.getTransportDetailsBySchoolId = function (schoolId) {
          var _activepromise = $q.defer();
          Bus.find({ filter: { where: { schoolId: schoolId } } }, function (response) {
              _activepromise.resolve(response);
          });
          return _activepromise.promise;
      }
  });
