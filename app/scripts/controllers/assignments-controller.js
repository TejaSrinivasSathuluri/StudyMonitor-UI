'use strict';

/**
 * @ngdoc function
 * @name studymonitorApp.controller:AssignmentsControllerCtrl
 * @description
 * # AssignmentsControllerCtrl
 * Controller of the studymonitorApp
 */
angular.module('studymonitorApp')
    .controller('AssignmentsController', function (assignmentsService, $cookies, $timeout) {
        var AssignmentsCtrl = this;
        //Get Assignment details by School ID
        AssignmentsCtrl.schoolId = $cookies.getObject('uds').schoolId;

        function Init() {

            this.getAssignmentDetails = function () {
                assignmentsService.getAssignmentDetailsBySchoolId(AssignmentsCtrl.schoolId).then(function (result) {
                    if (result) {
                        AssignmentsCtrl.assignmentList = result;
                    }
                }, function (error) {
                    console.log('Error while fetching the assignment records. Error stack : ' + error);
                });
            };
            this.getClassDetails = function(){
                assignmentsService.getClassDetailsBySchoolId(AssignmentsCtrl.schoolId).then(function (result) {
                    if (result) {
                        AssignmentsCtrl.classList = result;
                    }
                }, function (error) {
                    console.log('Error while fetching the assignment records. Error stack : ' + error);
                });
            };
            this.getSubjectDetails = function(){
                assignmentsService.getSubjectDetailsBySchoolId(AssignmentsCtrl.schoolId).then(function (result) {
                    if (result) {
                        AssignmentsCtrl.subjectList = result;
                    }
                }, function (error) {
                    console.log('Error while fetching the assignment records. Error stack : ' + error);
                });
            }
        }
        (new Init()).getAssignmentDetails();
        (new Init()).getClassDetails();
        (new Init()).getSubjectDetails();
        //Initialize the Table Component
        $timeout(function () {
            var columnsDefs = [null, null,null, {
                'width': '30%'
            }, null, null, {
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
            TableEditable.init('#assignments_datatable', columnsDefs);
            Metronic.init();
        });
        //Close or Open modal
        AssignmentsCtrl.closeModal = function () {
            var modal = $('#edit-assignments');
            modal.modal('hide');

            //ClearFields
            clearformfields();
        };
        AssignmentsCtrl.openModal = function () {
            var modal = $('#edit-assignments');
            modal.modal('show');
        };
        //Clear Fields
        function clearformfields() {
            AssignmentsCtrl.formFields = {};
        }
        //Delete confirmation box
        AssignmentsCtrl.confirmCallbackMethod = function (index) {
            deleteAssignment(index);
        };
        //Delete cancel box
        AssignmentsCtrl.confirmCallbackCancel = function () {
            return false;
        };
        // Add Action
        AssignmentsCtrl.assignmentAction = function (invalid) {
            if (invalid) {
                return;
            }
            var data = {
                schoolId: AssignmentsCtrl.schoolId,
                title: AssignmentsCtrl.formFields.title,
                classId: AssignmentsCtrl.formFields.classId,
                description: AssignmentsCtrl.formFields.description,
                fromDate: AssignmentsCtrl.formFields.fromDate,
                toDate: AssignmentsCtrl.formFields.toDate
            };
            if (data) {
                assignmentsService.getExistingAssignmentRecords(data).then(function (result) {
                    if (result) {
                        console.log('data already exists');
                        return;
                    }
                }, function (result1) {
                    if (result1) {
                        assignmentsService.CreateOrUpdateAssignment(data).then(function (res) {
                            if (res) {
                                (new Init()).getAssignmentDetails();
                                AssignmentsCtrl.closeModal();
                            }

                        }, function (error) {
                            console.log('Error while Fetching the Records' + error);
                        });
                    }
                });
            }
        };
        //Delete Action
        var deleteAssignment = function (index) {
            if (AssignmentsCtrl.assignmentList) {
                assignmentsService.deleteAssignment(AssignmentsCtrl.assignmentList[index].id).then(function (result) {
                    if (result) {
                        //On Successfull refill the data list
                        (new Init()).getAssignmentDetails();
                        AssignmentsCtrl.closeModal();
                    }
                }, function (error) {
                    console.log('Error while deleting class. Error Stack' + error);
                });
            }
        };
    });
