'use strict';

/**
 * @ngdoc function
 * @name studymonitorApp.controller:SubjectsControllerCtrl
 * @description
 * # SubjectsControllerCtrl
 * Controller of the studymonitorApp
 */
angular.module('studymonitorApp')
  .controller('SubjectsController', function (subjectsService, $cookies, $timeout, APP_MESSAGES, toastr) {
      var SubjectsCtrl = this;
      //Defaults
      SubjectsCtrl.schoolId = $cookies.getObject('uds').schoolId;
      SubjectsCtrl.formFields = {};
      SubjectsCtrl.editmode = false;
      //Initialize code
      function Init() {
          this.fnSubjectList = function () {
              subjectsService.getSubjectListBySchoolId(SubjectsCtrl.schoolId).then(function (response) {
                  if (response) {
                      SubjectsCtrl.subjectList = response;
                  }
              }, function (error) {
                  console.log('Error while fetching subject list . Error stack : ' + error);
              });
          };
          this.getClassAndStaffList = function () {
              subjectsService.getClassAndStaffList(SubjectsCtrl.schoolId).then(function (result) {
                  if (result) {
                      SubjectsCtrl.classList = result.classes;
                      SubjectsCtrl.staffList = result.staffs;
                  }
              }, function (error) {
                  console.log('Error while fetching class and staff. Error stack ' + error);
              });
          };
      }
      (new Init()).fnSubjectList();
      (new Init()).getClassAndStaffList();

      $timeout(function () {
          var columnsDefs = [null, null, null, {
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
          TableEditable.init("#subjects_datatable", columnsDefs);
          //Initialize metronic
          Metronic.init();
      }, 1000);

      /* =============================== Modal Functionality ============================= */
      SubjectsCtrl.closeModal = function () {
          var modal = $('#edit-subject');
          modal.modal('hide');

          //ClearFields
          clearformfields();
      };
      SubjectsCtrl.openModal = function () {
          var modal = $('#edit-subject');
          modal.modal('show');
      };
      function clearformfields() {
          SubjectsCtrl.formFields = {};
      }
      //Delete confirmation box
      SubjectsCtrl.confirmCallbackMethod = function (index) {
          deleteSubject(index);
      };
      //Delete cancel box
      SubjectsCtrl.confirmCallbackCancel = function (index) {
          if (index) {
              return false;
          }
          return;
      };

      //********************************* Settings to float labels
      SubjectsCtrl.setFloatLabel = function () {
          Metronic.setFlotLabel($('input[name=subjectname]'));
          Metronic.setFlotLabel($('input[name=classname]'));
          Metronic.setFlotLabel($('input[name=staffname]'));
      };
      //********************************* Setting to float labels end

      //********************************** Create or Update New Record
      SubjectsCtrl.CreateOrUpdate = function (invalid) {
          if (invalid) {
              return;
          }
          var data = {
              schoolId: SubjectsCtrl.schoolId,
              classId: SubjectsCtrl.formFields.classId,
              subjectName: SubjectsCtrl.formFields.subjectName,
              staffId: SubjectsCtrl.formFields.staffName,
              examFlag: SubjectsCtrl.formFields.examFlag
          };

          if (data) {

              if (SubjectsCtrl.editmode) {
                  subjectsService.updateSubject(data).then(function (result) {
                      if (result) {
                          //Re initialize the data
                          (new Init()).fnSubjectList();
                          //Close Modal Window
                          SubjectsCtrl.closeModal();
                          //Clear Fields
                          clearformfields();
                          //Show Toast
                          toastr.success(APP_MESSAGES.UPDATE_SUCCESS);
                      }
                  }, function (error) {
                      if (error) {
                          //Close Modal Window
                          SubjectsCtrl.closeModal();
                          //Clear Fields
                          clearformfields();
                          //Show Toast
                          toastr.error(APP_MESSAGES.SERVER_ERROR);
                      }
                  });
              }
              else {
                  subjectsService.verifyDataExistsOrNot(data).then(function (result) {
                      if (result) {
                          console.log('Data already exists');
                      }
                  }, function (result1) {
                      if (result1.status === 404) {
                          subjectsService.CreateSubject(data).then(function (result) {
                              if (result) {
                                  //Re initialize the data
                                  (new Init()).fnSubjectList();
                                  //Close Modal Window
                                  SubjectsCtrl.closeModal();
                                  //Clear Fields
                                  clearformfields();
                                  //Show Toast
                                  toastr.success(APP_MESSAGES.INSERT_SUCCESS);
                              }
                          }, function (error) {
                              console.log('Error while fetching records. Error stack : ' + error);
                          });
                      }
                  });
              }
          }
      };
      //********************************** Create or Update New Record End
      //********************************** Delete Record

      //Delete Action
      var deleteSubject = function (index) {
          if (SubjectsCtrl.subjectList) {
              subjectsService.deleteSubject(SubjectsCtrl.subjectList[index].id).then(function (result) {
                  if (result) {
                      //On Successfull refill the data list
                      (new Init()).fnSubjectList();
                      SubjectsCtrl.closeModal();
                  }
              }, function (error) {
                  console.log('Error while deleting class. Error Stack' + error);
              });
          }
      };
      //********************************** Delete Record Ends

      //Edit Subject
      SubjectsCtrl.editSubject = function (index) {
          SubjectsCtrl.formFields.subjectName = SubjectsCtrl.subjectList[index].subjectName;
          SubjectsCtrl.formFields.classId = SubjectsCtrl.subjectList[index].classId;
          SubjectsCtrl.formFields.staffName = SubjectsCtrl.subjectList[index].staffId;
          SubjectsCtrl.formFields.examFlag = SubjectsCtrl.subjectList[index].examFlag;

          //Open Modal
          SubjectsCtrl.openModal();

          $timeout(function () {
              SubjectsCtrl.setFloatLabel();
              SubjectsCtrl.editmode = true;
          });
      };

      /* =============================== Modal Functionality End ========================= */
  });
