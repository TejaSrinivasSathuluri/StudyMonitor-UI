'use strict';

/**
 * @ngdoc function
 * @name studymonitorApp.controller:ClassControllerCtrl
 * @description
 * # ClassControllerCtrl
 * Controller of the studymonitorApp
 */
angular.module('studymonitorApp')
    .controller('ClassController', function ($log, $timeout, classService, APP_MESSAGES, $cookies, $state, toastr) {
        var ClassCtrl = this;
        ClassCtrl.formFields = {};
        ClassCtrl.editmode = false;

        function init() {
            //var GetClassDetails = function () {
            ClassCtrl.schoolId = $cookies.getObject('uds').schoolId;
            classService.getClassDetails(ClassCtrl.schoolId).then(function (result) {
                if (result && result.hasOwnProperty('classes')) {
                    ClassCtrl.classList = result.classes;
                    ClassCtrl.staffList = result.staffs;
                }
            }, function (error) {
                if (error) {
                    console.log("Error while fecthing class records. Error stack: " + error);
                }
            });
            //}
        }
        init();


        //Initialize the Table Component
        $timeout(function () {
            var columnsDefs = [null, null, null, {
                'orderable': false,
                'width': '10%',
                'targets': 0
            }, {
                'orderable': false,
                'width': '10%',
                'targets': 0
            }, {
                'orderable': false,
                'width': '10%',
                'targets': 0
            }];
            TableEditable.init('#class_datatable', columnsDefs);
            Metronic.init();
        }, 1000);

        /*
         * Actions - For Create a new Class
         * Actions - For Updating the existing records
         */
        ClassCtrl.classAction = function (invalid) {
            if (invalid) {
                return;
            }
            var data = {
                schoolId: ClassCtrl.schoolId,
                className: ClassCtrl.formFields.className,
                sectionName: ClassCtrl.formFields.sectionName,
                staffId: ClassCtrl.formFields.staffName
            }
            if (data) {

                //Check whether editmode or normal mode
                if (ClassCtrl.editmode) {
                    classService.classAddOrUpdate({ id: ClassCtrl.editingClassId, staffId: data.staffId }).then(function (response) {
                        if (response) {
                            //On successfull refill the data list
                            init();
                            //Close Modal
                            ClassCtrl.closeModal();
                            //Show Toast Message Success
                            toastr.success(APP_MESSAGES.UPDATE_SUCCESS);
                        }
                    }, function (error) {
                        toastr.error(error, APP_MESSAGES.SERVER_ERROR);
                    });
                }
                else {
                    classService.classAddOrUpdate(data).then(function (result) {
                        if (result) {
                            //On Successfull refill the data list
                            init();
                            //Close Modal
                            ClassCtrl.closeModal();
                            //Show Toast Message Success
                            toastr.success(APP_MESSAGES.INSERT_SUCCESS);
                        }
                    }, function (error) {
                        toastr.error(error, APP_MESSAGES.SERVER_ERROR);
                        console.log('Error while creating or updating records. Error stack' + error);
                    });
                }
            }
        }
        //Delete Action
        var deleteClass = function (index) {
            if (ClassCtrl.classList) {
                classService.deleteClass(ClassCtrl.classList[index].id).then(function (result) {
                    if (result) {
                        //On Successfull refill the data list
                        init();
                        ClassCtrl.closeModal();
                    }
                }, function (error) {
                    console.log('Error while deleting class. Error Stack' + error);
                });
            }
        }
        //Edit Action
        ClassCtrl.editClass = function (index) {
            ClassCtrl.formFields.className = ClassCtrl.classList[index].className;
            ClassCtrl.formFields.sectionName = ClassCtrl.classList[index].sectionName;
            ClassCtrl.formFields.staffName = ClassCtrl.classList[index].staffId;
            ClassCtrl.editingClassId = ClassCtrl.classList[index].id;
            //Open Modal
            ClassCtrl.openModal();

            $timeout(function () {

                ClassCtrl.setFloatLabel();
                //Enable Edit Mode
                ClassCtrl.editmode = true;
            });

        }

        //Setting up float label
        ClassCtrl.setFloatLabel = function () {
            Metronic.setFlotLabel($('input[name=sectionname]'));
            Metronic.setFlotLabel($('input[name=classname]'));
            Metronic.setFlotLabel($('input[name=staffname]'));
        }

        //Close or Open modal
        ClassCtrl.closeModal = function () {
            var modal = $('#edit-class');
            modal.modal('hide');

            //ClearFields
            clearformfields();
        }
        ClassCtrl.openModal = function () {
            var modal = $('#edit-class');
            modal.modal('show');
        }
        //Clear Fields
        function clearformfields() {
            ClassCtrl.formFields = {};
        }

        //Delete confirmation box
        ClassCtrl.confirmCallbackMethod = function (index) {
            deleteClass(index);
        }
        //Delete cancel box
        ClassCtrl.confirmCallbackCancel = function (index) {
            return false;
        }
    });
