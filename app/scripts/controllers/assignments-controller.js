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
        AssignmentsCtrl.formFields = {};
        AssignmentsCtrl.editmode = false;
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
            this.getClassDetails = function () {
                assignmentsService.getClassDetailsBySchoolId(AssignmentsCtrl.schoolId).then(function (result) {
                    if (result) {
                        AssignmentsCtrl.classList = result;
                    }
                }, function (error) {
                    console.log('Error while fetching the assignment records. Error stack : ' + error);
                });
            };
            this.getSubjectDetails = function () {
                assignmentsService.getSubjectDetailsBySchoolId(AssignmentsCtrl.schoolId).then(function (result) {
                    if (result) {
                        AssignmentsCtrl.subjectList = result;
                    }
                }, function (error) {
                    console.log('Error while fetching the assignment records. Error stack : ' + error);
                });
            };
        }
        (new Init()).getAssignmentDetails();
        (new Init()).getClassDetails();
        //(new Init()).getSubjectDetails();
        //Initialize the Table Component
        $timeout(function () {
            var columnsDefs = [null, null, null, {
                'width': '30%'
            }, null, null,{
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
        },1000);
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
                subjectId: AssignmentsCtrl.formFields.subjectId,
                description: AssignmentsCtrl.formFields.description,
                fromDate: AssignmentsCtrl.formFields.fromDate,
                toDate: AssignmentsCtrl.formFields.toDate
            };
            if (data) {

                //Check whether editmode or normal mode
                if (!AssignmentsCtrl.editmode) {
                    assignmentsService.getExistingAssignmentRecords(data).then(function (result) {
                        if (result) {
                            toastr.error(APP_MESSAGES.DATA_EXISTS_DESC, APP_MESSAGES.DATA_EXISTS);
                            console.log('data already exists');
                            return;
                        }
                    }, function (result1) {
                        if (result1) {
                            assignmentsService.CreateOrUpdateAssignment(data).then(function (res) {
                                if (res) {
                                    (new Init()).getAssignmentDetails();
                                    AssignmentsCtrl.closeModal();
                                    //Show Toast Message Success
                                    toastr.success(APP_MESSAGES.INSERT_SUCCESS);
                                }

                            }, function (error) {
                                toastr.error(error, APP_MESSAGES.SERVER_ERROR);
                                console.log('Error while Fetching the Records' + error);
                            });
                        }
                    });
                }
                else {
                    data.id = AssignmentsCtrl.editingAssignmentId;
                    assignmentsService.editAssignment(data).then(function (result) {
                        if (result) {
                            //On Successfull refill the data list
                            (new Init()).getAssignmentDetails();
                            //Close Modal
                            AssignmentsCtrl.closeModal();
                            //Show Toast Message Success
                            toastr.success(APP_MESSAGES.UPDATE_SUCCESS);
                        }
                    }, function (error) {
                        toastr.error(error, APP_MESSAGES.SERVER_ERROR);
                        console.log('Error while creating or updating records. Error stack' + error);
                    });
                }
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
        //Edit Action
        AssignmentsCtrl.editAssignment = function (index) {
            AssignmentsCtrl.formFields.title = AssignmentsCtrl.assignmentList[index].title;
            AssignmentsCtrl.formFields.classId = AssignmentsCtrl.assignmentList[index].classId;
            AssignmentsCtrl.formFields.subjectId = AssignmentsCtrl.assignmentList[index].subjectId;
            AssignmentsCtrl.formFields.description = AssignmentsCtrl.assignmentList[index].description;
            AssignmentsCtrl.formFields.fromDate = AssignmentsCtrl.assignmentList[index].fromDate;
            AssignmentsCtrl.formFields.toDate = AssignmentsCtrl.assignmentList[index].toDate;
            AssignmentsCtrl.editingAssignmentId = AssignmentsCtrl.assignmentList[index].id;
            //Open Modal
            AssignmentsCtrl.openModal();

            $timeout(function () {

                AssignmentsCtrl.setFloatLabel();
                //Enable Edit Mode
                AssignmentsCtrl.editmode = true;
            });

        };
        //Setting up float label
        AssignmentsCtrl.setFloatLabel = function () {
            Metronic.setFlotLabel($('input[name=title]'));
            Metronic.setFlotLabel($('input[name=classId]'));
            Metronic.setFlotLabel($('input[name=subjectId]'));
            Metronic.setFlotLabel($('input[name=description]'));
            Metronic.setFlotLabel($('input[name=fromDate]'));
            Metronic.setFlotLabel($('input[name=toDate]'));
        };
        //Calendar Fix @@TODO Move this to directive
        $('#assignmentdate1').on('dp.change', function () {
            AssignmentsCtrl.formFields.fromDate = $(this).val();
        });
        //Calendar Fix @@TODO Move this to directive
        $('#assignmentdate2').on('dp.change', function () {
            AssignmentsCtrl.formFields.toDate = $(this).val();
        });
        //Get Subjects based on Selected Classes
        AssignmentsCtrl.selectedClass = function(){
            if(AssignmentsCtrl.formFields.classId){
                assignmentsService.getSubjectsByClassId(AssignmentsCtrl.formFields.classId).then(function(result){
                    if(result){
                        AssignmentsCtrl.subjectList = result;
                    }
                })
            }
        }
    });
