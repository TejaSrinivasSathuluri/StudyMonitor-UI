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
      //Close or Open modal
        LibraryCtrl.closeModal = function () {
            var modal = $('#edit-library');
            modal.modal('hide');

            //ClearFields
            clearformfields();
        }
        LibraryCtrl.openModal = function () {
            var modal = $('#edit-library');
            modal.modal('show');
        }
        //Clear Fields
        function clearformfields() {
            LibraryCtrl.formFields = {};
        }
        // Add Action
        LibraryCtrl.libraryAction = function (invalid) {
            if (invalid) {
                return;
            }
            var data = {
                schoolId: LibraryCtrl.schoolId,
                name: LibraryCtrl.formFields.name,
                author: LibraryCtrl.formFields.author,
                description: LibraryCtrl.formFields.description,
                price: LibraryCtrl.formFields.price,
                available:LibraryCtrl.formFields.available
            }
            if (data) {
                libraryService.getExistingLibraryRecords(data).then(function (result) {
                    if (result) {
                        console.log('data already exists');
                        return;
                    }
                }, function (result1) {
                    libraryService.CreateOrUpdateLibrary(data).then(function (res) {
                        if (res) {
                            (new init()).getLibraryList();
                            LibraryCtrl.closeModal();
                        }

                    }, function (error) {
                        console.log("Error while Fetching the Records" + error);
                    });
                });
            }
        }
  });
