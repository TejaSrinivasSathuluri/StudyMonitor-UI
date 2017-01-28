'use strict';


/**
 * @ngdoc function
 * @name studymonitorApp.controller:NoticeboardControllerCtrl
 * @description
 * # NoticeboardControllerCtrl
 * Controller of the studymonitorApp
 */
angular.module('studymonitorApp')
angular.module('studymonitorApp')
    .controller('NoticeboardController', function (noticeboardService, $cookies, $timeout, APP_MESSAGES, toastr) {
        var NoticeboardCtrl = this;
        NoticeboardCtrl.formFields = {};
        NoticeboardCtrl.editmode = false;

        //Defaults
        NoticeboardCtrl.schoolId = $cookies.getObject('uds').schoolId;

        function Init() {
            this.getNoticeDetails = function () {
                noticeboardService.getNoticeDetailsBySchoolId(NoticeboardCtrl.schoolId).then(function (result) {
                    if (result) {
                        NoticeboardCtrl.noticeList = result;
                    }
                }, function (error) {
                    console.log('Error while fetching the assignment records. Error stack : ' + error);
                });
            }
        }
        (new Init()).getNoticeDetails();
        //Initialize the Table Component
        $timeout(function () {
            var columnsDefs = [{
                "width": "10%"
            }, {
                "width": "40%"
            }, {
                "width": "10%"
            }, {
                "width": "10%"
            }, {
                "orderable": false,
                "width": "10%",
                "targets": 0
            }, {
                "orderable": false,
                "width": "10%",
                "targets": 0
            }];
            TableEditable.init("#notice_datatable", columnsDefs);
            Metronic.init();
        }, 1000);
        //Close or Open modal
        NoticeboardCtrl.closeModal = function () {
            var modal = $('#edit-notice');
            modal.modal('hide');

            //ClearFields
            clearformfields();
        }
        NoticeboardCtrl.openModal = function () {
            var modal = $('#edit-notice');
            modal.modal('show');
        }
        //Clear Fields
        function clearformfields() {
            NoticeboardCtrl.formFields = {};
        }
        //Delete confirmation box
        NoticeboardCtrl.confirmCallbackMethod = function (index) {
            deleteNotice(index);
        }
        //Delete cancel box
        NoticeboardCtrl.confirmCallbackCancel = function (index) {
            return false;
        }
        // Add Action
        NoticeboardCtrl.noticeboardAction = function (invalid) {
            if (invalid) {
                return;
            }
            var data = {
                schoolId: NoticeboardCtrl.schoolId,
                title: NoticeboardCtrl.formFields.title,
                description: NoticeboardCtrl.formFields.description,
                date1: NoticeboardCtrl.formFields.date1,
                date2: NoticeboardCtrl.formFields.date2
            };
            if (data) {

                //Check whether editmode or normal mode
                if (!NoticeboardCtrl.editmode) {
                    noticeboardService.getExistingNoticeRecords(data).then(function (result) {
                        if (result) {
                            toastr.error(APP_MESSAGES.DATA_EXISTS_DESC, APP_MESSAGES.DATA_EXISTS);
                            console.log('data already exists');
                            return;
                        }
                    }, function (result1) {
                        noticeboardService.CreateOrUpdateNoticeboard(data).then(function (res) {
                            if (res) {
                                (new Init()).getNoticeDetails();
                                NoticeboardCtrl.closeModal();
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
                    data.id = NoticeboardCtrl.editingNoticeId;
                    noticeboardService.editNotice(data).then(function (result) {
                        if (result) {
                            //On Successfull refill the data list
                            (new Init()).getNoticeDetails();
                            //Close Modal
                            NoticeboardCtrl.closeModal();
                            //Show Toast Message Success
                            toastr.success(APP_MESSAGES.UPDATE_SUCCESS);
                        }
                    }, function (error) {
                        toastr.error(error, APP_MESSAGES.SERVER_ERROR);
                        console.log('Error while creating or updating records. Error stack' + error);
                    });
                }
            }
        }
        //Delete Action
        var deleteNotice = function (index) {
            if (NoticeboardCtrl.noticeList) {
                noticeboardService.deleteNotice(NoticeboardCtrl.noticeList[index].id).then(function (result) {
                    if (result) {
                        //On Successfull refill the data list
                        (new Init()).getNoticeDetails();
                        NoticeboardCtrl.closeModal();
                        //Show Toast Message Success
                        toastr.success(APP_MESSAGES.DELETE_SUCCESS);
                    }
                }, function (error) {
                    toastr.error(error, APP_MESSAGES.SERVER_ERROR);
                    console.log('Error while deleting Notices. Error Stack' + error);
                });
            }
        };
        //Edit Action
        NoticeboardCtrl.editNotice = function (index) {
            NoticeboardCtrl.formFields.title = NoticeboardCtrl.noticeList[index].title;
            NoticeboardCtrl.formFields.description = NoticeboardCtrl.noticeList[index].description;
            NoticeboardCtrl.formFields.date1 = NoticeboardCtrl.noticeList[index].date1;
            NoticeboardCtrl.formFields.date2 = NoticeboardCtrl.noticeList[index].date2;
            NoticeboardCtrl.editingNoticeId = NoticeboardCtrl.noticeList[index].id;
            //Open Modal
            NoticeboardCtrl.openModal();

            $timeout(function () {

                NoticeboardCtrl.setFloatLabel();
                //Enable Edit Mode
                NoticeboardCtrl.editmode = true;
            });

        };
        //Setting up float label
        NoticeboardCtrl.setFloatLabel = function () {
            Metronic.setFlotLabel($('input[name=title]'));
            Metronic.setFlotLabel($('input[name=description]'));
            Metronic.setFlotLabel($('input[name=date1]'));
            Metronic.setFlotLabel($('input[name=date2]'));
        };


        //Calendar Fix @@TODO Move this to directive
        $('#noticedate1').on('dp.change', function () {
            NoticeboardCtrl.formFields.date1 = $(this).val();
        });
        //Calendar Fix @@TODO Move this to directive
        $('#noticedate2').on('dp.change', function () {
            NoticeboardCtrl.formFields.date2 = $(this).val();
        });
    });
