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
        function Init() {
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
        (new Init()).getLibraryList();
        //Initialize the Table Component
        $timeout(function () {
            var columnsDefs = [{
                'width': '30%'
            },null,null,null,null,{
                'orderable': false,
                'width': '10%',
                'targets': 0
            }, {
                'orderable': false,
                'width': '10%',
                'targets': 0
            }];
            TableEditable.init('#libraries_datatable', columnsDefs);
            Metronic.init();
        },1000);
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
        //Delete confirmation box
        LibraryCtrl.confirmCallbackMethod = function (index) {
            deleteLibrary(index);
        }
        //Delete cancel box
        LibraryCtrl.confirmCallbackCancel = function (index) {
            return false;
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
                available: LibraryCtrl.formFields.available
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
        //Delete Action
        var deleteLibrary = function (index) {
            if (LibraryCtrl.libraryList) {
                libraryService.deleteLibrary(LibraryCtrl.libraryList[index].id).then(function (result) {
                    if (result) {
                        //On Successfull refill the data list
                        (new init()).getLibraryList();
                        LibraryCtrl.closeModal();
                    }
                }, function (error) {
                    console.log('Error while deleting class. Error Stack' + error);
                });
            }
        }
    });
