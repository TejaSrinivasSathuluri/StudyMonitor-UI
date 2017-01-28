'use strict';

/**
 * @ngdoc function
 * @name studymonitorApp.controller:GradeControllerCtrl
 * @description
 * # GradeControllerCtrl
 * Controller of the studymonitorApp
 */
angular.module('studymonitorApp')
    .controller('GradeController', function (gradeService, $cookies, $timeout) {
        var GradeCtrl = this;
        //Get Grade details by School ID
        GradeCtrl.schoolId = $cookies.getObject('uds').schoolId;

        function Init() {

            this.getGradeDetails = function () {
                gradeService.getGradeDetailsBySchoolId(GradeCtrl.schoolId).then(function (result) {
                    if (result) {
                        GradeCtrl.gradeList = result;
                    }
                }, function (error) {
                    console.log('Error while fetching the assignment records. Error stack : ' + error);
                });
            }
        }
        (new Init()).getGradeDetails();
        //Initialize the Table Component
        $timeout(function () {
            var columnsDefs = [null, null,null, {
                'width': '30%'
            }, {
                'orderable': false,
                'width': '10%',
                'targets': 0
            }, {
                'orderable': false,
                'width': '10%',
                'targets': 0
            }];
            TableEditable.init('#grade_datatable', columnsDefs);
            Metronic.init();
        },1000);
        //Close or Open modal
        GradeCtrl.closeModal = function () {
            var modal = $('#edit-grades');
            modal.modal('hide');

            //ClearFields
            clearformfields();
        };
        GradeCtrl.openModal = function () {
            var modal = $('#edit-grades');
            modal.modal('show');
        };
        //Clear Fields
        function clearformfields() {
            GradeCtrl.formFields = {};
        }
        //Delete confirmation box
        GradeCtrl.confirmCallbackMethod = function (index) {
            deleteGrade(index);
        };
        //Delete cancel box
        GradeCtrl.confirmCallbackCancel = function () {
            return false;
        };
        // Add Action
        GradeCtrl.gradeAction = function (invalid) {
            if (invalid) {
                return;
            }
            var data = {
                schoolId: GradeCtrl.schoolId,
                gradeName: GradeCtrl.formFields.gradeName,
                gradePoint: GradeCtrl.formFields.gradePoint,
                percentageRangeFrom: GradeCtrl.formFields.percentageRangeFrom,
                percentageRangeTo: GradeCtrl.formFields.percentageRangeTo
            };
            if (data) {
                gradeService.getExistingGrades(data).then(function (result) {
                    if (result) {
                        console.log('data already exists');
                        return;
                    }
                }, function (result1) {
                    if (result1) {
                        gradeService.CreateOrUpdateGrade(data).then(function (res) {
                            if (res) {
                                (new Init()).getGradeDetails();
                                GradeCtrl.closeModal();
                            }

                        }, function (error) {
                            console.log('Error while Fetching the Records' + error);
                        });
                    }
                });
            }
        };
        //Delete Action
        var deleteGrade = function (index) {
            if (GradeCtrl.gradeList) {
                gradeService.deleteGrade(GradeCtrl.gradeList[index].id).then(function (result) {
                    if (result) {
                        //On Successfull refill the data list
                        (new Init()).getGradeDetails();
                        GradeCtrl.closeModal();
                    }
                }, function (error) {
                    console.log('Error while deleting grade. Error Stack' + error);
                });
            }
        };
    });
