'use strict';

/**
 * @ngdoc function
 * @name studymonitorApp.controller:ExamlistControllerCtrl
 * @description
 * # ExamlistControllerCtrl
 * Controller of the studymonitorApp
 */
angular.module('studymonitorApp')
    .controller('ExamlistController', function (examlistService, $timeout, $cookies) {
        var ExamlistCtrl = this;
        //Defaults
        ExamlistCtrl.schoolId = $cookies.getObject('uds').schoolId;

        function init() {
            this.getExamList = function () {
                examlistService.getExamListBySchoolId(ExamlistCtrl.schoolId).then(function (result) {
                    if (result) {
                        ExamlistCtrl.examList = result;

                        //Trigger the editable datatable
                        $timeout(function () {
                            var columnsDefs = [null, null, null, null, {
                                "orderable": false,
                                "width": "10%",
                                "targets": 0
                            }, {
                                    "orderable": false,
                                    "width": "10%",
                                    "targets": 0
                                }, {
                                    "orderable": false,
                                    "width": "10%",
                                    "targets": 0
                                }];
                            TableEditable.init("#examlist_datatable", columnsDefs);
                            Metronic.init();
                        });
                    }
                }, function (error) {
                    console.log('Error while fetching records for Exams List. Error stack : ' + error);
                });
            }
        }
        (new init()).getExamList();
        //Close or Open modal
        ExamlistCtrl.closeModal = function () {
            var modal = $('#edit-examlist');
            modal.modal('hide');

            //ClearFields
            clearformfields();
        }
        ExamlistCtrl.openModal = function () {
            var modal = $('#edit-examlist');
            modal.modal('show');
        }
        //Clear Fields
        function clearformfields() {
            ExamlistCtrl.formFields = {};
        }
        // Add Action
        ExamlistCtrl.examAction = function (invalid) {
            if (invalid) {
                return;
            }
            var data = {
                schoolId: ExamlistCtrl.schoolId,
                examName: ExamlistCtrl.formFields.examName,
                classId: ExamlistCtrl.formFields.classId,
                fromDate: ExamlistCtrl.formFields.fromDate,
                toDate: ExamlistCtrl.formFields.toDate
            }
            if (data) {
                examlistService.getExistingExamlists(data).then(function (result) {
                    if (result) {
                        console.log('data already exists');
                        return;
                    }
                }, function (result1) {
                    examlistService.CreateOrUpdateExam(data).then(function (res) {
                        if (res) {
                            (new init()).getExamList();
                            ExamlistCtrl.closeModal();
                        }

                    }, function (error) {
                        console.log("Error while Fetching the Records" + error);
                    });
                });
            }
        }

    });
