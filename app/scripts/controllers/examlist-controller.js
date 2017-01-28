'use strict';

/**
 * @ngdoc function
 * @name studymonitorApp.controller:ExamlistControllerCtrl
 * @description
 * # ExamlistControllerCtrl
 * Controller of the studymonitorApp
 */
angular.module('studymonitorApp')
    .controller('ExamlistController', function (examlistService, $timeout, $cookies,toastr, APP_MESSAGES) {
        var ExamlistCtrl = this;
        ExamlistCtrl.formFields = {};
        ExamlistCtrl.editmode = false;
        //Defaults
        ExamlistCtrl.schoolId = $cookies.getObject('uds').schoolId;

        function Init() {
            this.getExamList = function () {
                examlistService.getExamListBySchoolId(ExamlistCtrl.schoolId).then(function (result) {
                    if (result) {
                        ExamlistCtrl.examList = result;

                        //Trigger the editable datatable
                        $timeout(function () {
                            var columnsDefs = [null, null, null, null, {
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
                            TableEditable.init('#examlist_datatable', columnsDefs);
                            Metronic.init();
                        });
                    }
                }, function (error) {
                    console.log('Error while fetching records for Exams List. Error stack : ' + error);
                });
            };
            this.getClassDetails = function () {
                examlistService.getClassDetailsBySchoolId(ExamlistCtrl.schoolId).then(function (result) {
                    if (result) {
                        ExamlistCtrl.classList = result;
                    }
                }, function (error) {
                    console.log('Error while fetching the assignment records. Error stack : ' + error);
                });
            };
        }
        (new Init()).getExamList();
        (new Init()).getClassDetails();
        //Close or Open modal
        ExamlistCtrl.closeModal = function () {
            var modal = $('#edit-examlist');
            modal.modal('hide');

            //ClearFields
            clearformfields();
        };
        ExamlistCtrl.openModal = function () {
            var modal = $('#edit-examlist');
            modal.modal('show');
        };
        //Clear Fields
        function clearformfields() {
            ExamlistCtrl.formFields = {};
        }
        //Delete confirmation box
        ExamlistCtrl.confirmCallbackMethod = function (index) {
            deleteExam(index);
        };
        //Delete cancel box
        ExamlistCtrl.confirmCallbackCancel = function (index) {
            if (index) {
                return false;
            }
            return;
        };
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
            };


            if (data) {

                //Check whether editmode or normal mode
                if (!ExamlistCtrl.editmode) {
                    examlistService.getExistingExamlists(data).then(function (result) {
                    if (result) {
                        console.log('data already exists');
                        return;
                    }
                }, function (result1) {
                    if (result1) {
                        examlistService.CreateOrUpdateExam(data).then(function (res) {
                            if (res) {
                                (new Init()).getExamList();
                                ExamlistCtrl.closeModal();
                                //Show Toast Message Success
                                    toastr.success(APP_MESSAGES.INSERT_SUCCESS);
                            }

                        }, function (error) {
                            console.log('Error while Fetching the Records' + error);
                        });
                    }
                });
                }
                else {
                    data.id = ExamlistCtrl.editingExamlistId;
                    examlistService.editExamlist(data).then(function (result) {
                        if (result) {
                            //On Successfull refill the data list
                            (new Init()).getExamList();
                            //Close Modal
                            ExamlistCtrl.closeModal();
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
            //     examlistService.getExistingExamlists(data).then(function (result) {
            //         if (result) {
            //             console.log('data already exists');
            //             return;
            //         }
            //     }, function (result1) {
            //         if (result1) {
            //             examlistService.CreateOrUpdateExam(data).then(function (res) {
            //                 if (res) {
            //                     (new Init()).getExamList();
            //                     ExamlistCtrl.closeModal();
            //                     //Show Toast Message Success
            //                         toastr.success(APP_MESSAGES.INSERT_SUCCESS);
            //                 }

            //             }, function (error) {
            //                 console.log('Error while Fetching the Records' + error);
            //             });
            //         }
            //     });
            // }
        };
        //Delete Action
        var deleteExam = function (index) {
            if (ExamlistCtrl.examList) {
                examlistService.deleteExam(ExamlistCtrl.examList[index].id).then(function (result) {
                    if (result) {
                        //On Successfull refill the data list
                        (new Init()).getExamList();
                        ExamlistCtrl.closeModal();
                         toastr.success(APP_MESSAGES.DELETE_SUCCESS);
                    }
                }, function (error) {
                    console.log('Error while deleting class. Error Stack' + error);
                });
            }
        };

        //Edit Action
        ExamlistCtrl.editExamlist = function (index) {
            ExamlistCtrl.formFields.classId = ExamlistCtrl.examList[index].classId;
            ExamlistCtrl.formFields.examName = ExamlistCtrl.examList[index].examName;
            ExamlistCtrl.formFields.fromDate = ExamlistCtrl.examList[index].fromDate;
            ExamlistCtrl.formFields.toDate = ExamlistCtrl.examList[index].toDate;
            ExamlistCtrl.editingExamlistId = ExamlistCtrl.examList[index].id;
            //Open Modal
            ExamlistCtrl.openModal();

            $timeout(function () {

                ExamlistCtrl.setFloatLabel();
                //Enable Edit Mode
                ExamlistCtrl.editmode = true;
            });

        };
        //Setting up float label
        ExamlistCtrl.setFloatLabel = function () {
            Metronic.setFlotLabel($('input[name=classId]'));
            Metronic.setFlotLabel($('input[name=examName]'));
            Metronic.setFlotLabel($('input[name=fromDate]'));
            Metronic.setFlotLabel($('input[name=toDate]'));
        };

          //Calendar Fix @@TODO Move this to directive
        $('#Exam_date1').on('dp.change', function () {
            ExamlistCtrl.formFields.fromDate = $(this).val();
        });

        $('#Exam_date2').on('dp.change', function () {
                    ExamlistCtrl.formFields.toDate = $(this).val();
                });
    });
