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
    .controller('NoticeboardController', function(noticeboardService, $cookies, $timeout) {
        var NoticeboardCtrl = this;
        NoticeboardCtrl.schoolId = $cookies.getObject('uds').schoolId;

        function init() {
            this.getNoticeDetails = function() {
                noticeboardService.getNoticeDetailsBySchoolId(NoticeboardCtrl.schoolId).then(function(result) {
                    if (result) {
                        NoticeboardCtrl.noticeList = result;
                    }
                }, function(error) {
                    console.log('Error while fetching the assignment records. Error stack : ' + error);
                });
            }
        }
        (new init()).getNoticeDetails();
        //Initialize the Table Component
        $timeout(function() {
            var columnsDefs = [{
                "width":"10%"
            }, {
                "width":"40%"
            }, {
                "width": "10%"
            }, {
                "width":"10%"
            },{
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
        },1000);
        //Close or Open modal
        NoticeboardCtrl.closeModal = function() {
            var modal = $('#edit-notice');
            modal.modal('hide');

            //ClearFields
            clearformfields();
        }
        NoticeboardCtrl.openModal = function() {
                var modal = $('#edit-notice');
                modal.modal('show');
            }
            //Clear Fields
        function clearformfields() {
            NoticeboardCtrl.formFields = {};
        }
        //Delete confirmation box
        NoticeboardCtrl.confirmCallbackMethod = function(index) {
                deleteNotice(index);
            }
            //Delete cancel box
        NoticeboardCtrl.confirmCallbackCancel = function(index) {
                return false;
            }
            // Add Action
        NoticeboardCtrl.noticeboardAction = function(invalid) {
                if (invalid) {
                    return;
                }
                var data = {
                    schoolId: NoticeboardCtrl.schoolId,
                    title: NoticeboardCtrl.formFields.title,
                    description: NoticeboardCtrl.formFields.description,
                    date1: NoticeboardCtrl.formFields.date1,
                    date2: NoticeboardCtrl.formFields.date2
                }
                if (data) {
                    noticeboardService.getExistingNoticeRecords(data).then(function(result) {
                        if (result) {
                            console.log('data already exists');
                            return;
                        }
                    }, function(result1) {
                        noticeboardService.CreateOrUpdateNoticeboard(data).then(function(res) {
                            if (res) {
                                (new init()).getNoticeDetails();
                                NoticeboardCtrl.closeModal();
                            }

                        }, function(error) {
                            console.log("Error while Fetching the Records" + error);
                        });
                    });
                }
            }
            //Delete Action
        var deleteNotice = function(index) {
            if (NoticeboardCtrl.noticeList) {
                noticeboardService.deleteNotice(NoticeboardCtrl.noticeList[index].id).then(function(result) {
                    if (result) {
                        //On Successfull refill the data list
                        (new init()).getNoticeDetails();
                        NoticeboardCtrl.closeModal();
                    }
                }, function(error) {
                    console.log('Error while deleting class. Error Stack' + error);
                });
            }
        }
    });
