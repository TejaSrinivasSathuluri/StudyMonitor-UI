'use strict';

/**
 * @ngdoc service
 * @name studymonitorApp.libraryService
 * @description
 * # libraryService
 * Service in the studymonitorApp.
 */
angular.module('studymonitorApp')
  .service('libraryService', function ($q, Library) {
      // AngularJS will instantiate a singleton by calling "new" on this function
      this.getLibraryBySchoolId = function (schoolId) {
          var _activepromise = $q.defer();
          Library.find({ filter: { where: { schoolId: schoolId } } }, function (response) {
              _activepromise.resolve(response);
          }, function (error) {
              _activepromise.reject(error);
          });
          return _activepromise.promise;
      }
  });