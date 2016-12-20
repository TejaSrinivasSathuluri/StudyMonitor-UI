'use strict';

/**
 * @ngdoc function
 * @name studymonitorApp.controller:LibraryControllerCtrl
 * @description
 * # LibraryControllerCtrl
 * Controller of the studymonitorApp
 */
angular.module('studymonitorApp')
  .controller('LibraryController', function (libraryService, $cookies, $timeout) {
      var LibraryCtrl = this;
      LibraryCtrl.schoolId = $cookies.getObject('uds').schoolId;
      function init() {
          this.getLibraryList = function () {
              libraryService.getLibraryBySchoolId(LibraryCtrl.schoolId).then(function (result) {
                  if (result) {
                      LibraryCtrl.libraryList = result;
                  }
              }, function (error) {
                  console.log('Error while fetching library records. Error stack : ' + error);
              });
          }
      }
  });
