'use strict';

/**
 * @ngdoc function
 * @name studymonitorApp.controller:GradeControllerCtrl
 * @description
 * # GradeControllerCtrl
 * Controller of the studymonitorApp
 */
angular.module('studymonitorApp')
    .controller('GradeController', function (gradeService, $timeout, $cookies) {
        var GradeCtrl = this;
        //Defaults
        GradeCtrl.schoolId = $cookies.getObject('uds').schoolId;

        function init() {
            this.getGradeList = function () {
                gradeService.getGradesListBySchoolId(GradeCtrl.schoolId).then(function (result) {

                    if (result) {
                        GradeCtrl.gradelist = result;
                    }
                }, function (error) {
                    console.log('Error while fecthing records for Grade. Error stack : ' + error);
                });
            }
        }
        (new init()).getGradeList();
        //Close or Open modal
        GradeCtrl.closeModal = function () {
            var modal = $('#edit-grades');
            modal.modal('hide');

            //ClearFields
            clearformfields();
        }
        GradeCtrl.openModal = function () {
            var modal = $('#edit-grades');
            modal.modal('show');
        }
        //Clear Fields
        function clearformfields() {
            GradeCtrl.formFields = {};
        }
        //Delete confirmation box
        GradeCtrl.confirmCallbackMethod = function (index) {
            deleteGrade(index);
        }
        //Delete cancel box
        GradeCtrl.confirmCallbackCancel = function (index) {
            return false;
        }
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
            }
            if (data) {
                gradeService.getExistingGrades(data).then(function (result) {
                    if (result) {
                        console.log('data already exists');
                        return;
                    }
                }, function (result1) {
                    gradeService.CreateOrUpdateGrade(data).then(function (res) {
                        if (res) {
                            (new init()).getGradeList();
                            GradeCtrl.closeModal();
                        }

                    }, function (error) {
                        console.log("Error while Fetching the Records" + error);
                    });
                });
            }
        }
        //Delete Action
        var deleteGrade = function (index) {
            if (GradeCtrl.gradelist) {
                gradeService.deleteGrade(GradeCtrl.gradelist[index].id).then(function (result) {
                    if (result) {
                        //On Successfull refill the data list
                        (new init()).getGradeList();
                        GradeCtrl.closeModal();
                    }
                }, function (error) {
                    console.log('Error while deleting class. Error Stack' + error);
                });
            }
        }

    });
