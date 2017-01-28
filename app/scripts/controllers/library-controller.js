'use strict';

/**
 * @ngdoc function
 * @name studymonitorApp.controller:LibraryControllerCtrl
 * @description
 * # LibraryControllerCtrl
 * Controller of the studymonitorApp
 */
angular.module('studymonitorApp')
    .controller('LibraryController', function (libraryService, $cookies, $timeout,APP_MESSAGES,toastr) {
        var LibraryCtrl = this;
         LibraryCtrl.formFields = {};
        LibraryCtrl.editmode = false;

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
            };

            if (data) {

                //Check whether editmode or normal mode
                if (!LibraryCtrl.editmode) {
                    libraryService.getExistingLibraryRecords(data).then(function (result) {
                    if (result) {
                        console.log('data already exists');
                          toastr.error(APP_MESSAGES.DATA_EXISTS_DESC, APP_MESSAGES.DATA_EXISTS);
                        return;
                    }
                }, function (result1) {
                    libraryService.CreateOrUpdateLibrary(data).then(function (res) {
                        if (res) {
                            (new Init()).getLibraryList();
                            LibraryCtrl.closeModal();
                             //Show Toast Message Success
                            toastr.success(APP_MESSAGES.INSERT_SUCCESS);
                        }

                    }, function (error) {
                         toastr.error(error, APP_MESSAGES.SERVER_ERROR);
                        console.log("Error while Fetching the Records" + error);
                    });
                });
                }
                else {
                    data.id = LibraryCtrl.id;
                    libraryService.editLibrary(data).then(function (result) {
                        if (result) {
                            //On Successfull refill the data list
                            (new Init()).getLibraryRecords();
                            //Close Modal
                            LibraryCtrl.closeModal();
                            //Show Toast Message Success
                            toastr.success(APP_MESSAGES.UPDATE_SUCCESS);
                        }
                    }, function (error) {
                        toastr.error(error, APP_MESSAGES.SERVER_ERROR);
                        console.log('Error while creating or updating records. Error stack' + error);
                    });
                }
            }

            // if (data) {
            //     libraryService.getExistingLibraryRecords(data).then(function (result) {
            //         if (result) {
            //             console.log('data already exists');
            //               toastr.error(APP_MESSAGES.DATA_EXISTS_DESC, APP_MESSAGES.DATA_EXISTS);
            //             return;
            //         }
            //     }, function (result1) {
            //         libraryService.CreateOrUpdateLibrary(data).then(function (res) {
            //             if (res) {
            //                 (new Init()).getLibraryList();
            //                 LibraryCtrl.closeModal();
            //                  //Show Toast Message Success
            //                 toastr.success(APP_MESSAGES.INSERT_SUCCESS);
            //             }

            //         }, function (error) {
            //              toastr.error(error, APP_MESSAGES.SERVER_ERROR);
            //             console.log("Error while Fetching the Records" + error);
            //         });
            //     });
            // }
        }

        //Delete Action
        var deleteLibrary = function (index) {
            if (LibraryCtrl.libraryList) {
                libraryService.deleteLibrary(LibraryCtrl.libraryList[index].id).then(function (result) {
                    if (result) {
                        //On Successfull refill the data list
                        (new Init()).getLibraryList();
                        LibraryCtrl.closeModal();
                         toastr.success(APP_MESSAGES.DELETE_SUCCESS);
                    }
                }, function (error) {
                    console.log('Error while deleting class. Error Stack' + error);
                });
            }
        };

        //Edit Action
        LibraryCtrl.editLibrary = function (index) {
            LibraryCtrl.formFields.name = LibraryCtrl.libraryList[index].name;
            LibraryCtrl.formFields.author = LibraryCtrl.libraryList[index].author;
            LibraryCtrl.formFields.description = LibraryCtrl.libraryList[index].description;
            LibraryCtrl.formFields.price = LibraryCtrl.libraryList[index].price;
            LibraryCtrl.formFields.available = LibraryCtrl.libraryList[index].available;
            LibraryCtrl.id = LibraryCtrl.libraryList[index].id;
            //Open Modal
            LibraryCtrl.openModal();

            $timeout(function () {

                LibraryCtrl.setFloatLabel();
                //Enable Edit Mode
                LibraryCtrl.editmode = true;
            });

        };
        //Setting up float label
        LibraryCtrl.setFloatLabel = function () {
            Metronic.setFlotLabel($('input[name=name]'));
            Metronic.setFlotLabel($('input[name=author]'));
            Metronic.setFlotLabel($('input[name=description]'));
            Metronic.setFlotLabel($('input[name=price]'));
            Metronic.setFlotLabel($('input[name=available]'));
        };
    });
