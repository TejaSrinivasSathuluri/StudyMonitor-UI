'use strict';

/**
 * @ngdoc function
 * @name studymonitorApp.controller:MarksControllerCtrl
 * @description
 * # MarksControllerCtrl
 * Controller of the studymonitorApp
 */
angular.module('studymonitorApp')
  .controller('MarksController', function (marksService, $cookies, $timeout) {
      var MarksCtrl = this;
      //Get Assignment details by School ID
      MarksCtrl.schoolId = $cookies.getObject('uds').schoolId;

      function Init() {
          this.getMarksDetails = function () {
              marksService.getMarksDetailsBySchoolId(MarksCtrl.schoolId).then(function (result) {
                  if (result) {
                      MarksCtrl.marksList = result;
                  }
              }, function (error) {
                  console.log('Error while fetching the assignment records. Error stack : ' + error);
              });
          };
          this.getClassDetails = function () {
              marksService.getClassDetailsBySchoolId(MarksCtrl.schoolId).then(function (result) {
                  if (result) {
                      MarksCtrl.classList = result;
                  }
              }, function (error) {
                  console.log('Error while fetching the assignment records. Error stack : ' + error);
              });
          };
          this.getSubjectDetails = function () {
              marksService.getSubjectDetailsBySchoolId(MarksCtrl.schoolId).then(function (result) {
                  if (result) {
                      MarksCtrl.subjectList = result;
                  }
              }, function (error) {
                  console.log('Error while fetching the assignment records. Error stack : ' + error);
              });
          };
          this.getExamDetails = function () {
              marksService.getExamDetailsBySchoolId(MarksCtrl.schoolId).then(function (result) {
                  if (result) {
                      MarksCtrl.examList = result;
                  }
              }, function (error) {
                  console.log('Error while fetching the assignment records. Error stack : ' + error);
              });
          };
      }
      (new Init()).getMarksDetails();
      (new Init()).getClassDetails();
      (new Init()).getSubjectDetails();
      (new Init()).getExamDetails();
      //Initialize the Table Component
      $timeout(function () {
          var columnsDefs = [null, null, null, null, {
              'orderable': false,
              'width': '10%',
              'targets': 0
          }, {
              'orderable': false,
              'width': '10%',
              'targets': 0
          }];
          TableEditable.init('#marks_datatable', columnsDefs);
          Metronic.init();
      });
      //Close or Open modal
      MarksCtrl.closeModal = function () {
          var modal = $('#edit-marks');
          modal.modal('hide');
          //ClearFields
          clearformfields();
      };
      MarksCtrl.openModal = function () {
          var modal = $('#edit-marks');
          modal.modal('show');
      };
      //Clear Fields
      function clearformfields() {
          MarksCtrl.formFields = {};
      }
      //Delete confirmation box
      MarksCtrl.confirmCallbackMethod = function (index) {
          deleteMarks(index);
      };
      //Delete cancel box
      MarksCtrl.confirmCallbackCancel = function () {
          return false;
      };
      // Add Action
      MarksCtrl.markAction = function (invalid) {
          if (invalid) {
              return;
          }
          var data = {
              schoolId: MarksCtrl.schoolId,
              title: MarksCtrl.formFields.title,
              classId: MarksCtrl.formFields.classId,
              subjectId: MarksCtrl.formFields.subjectId,
              description: MarksCtrl.formFields.description,
              fromDate: MarksCtrl.formFields.fromDate,
              toDate: MarksCtrl.formFields.toDate
          };
          if (data) {
              marksService.getExistingAssignmentRecords(data).then(function (result) {
                  if (result) {
                      console.log('data already exists');
                      return;
                  }
              }, function (result1) {
                  if (result1) {
                      marksService.CreateOrUpdateAssignment(data).then(function (res) {
                          if (res) {
                              (new Init()).getAssignmentDetails();
                              MarksCtrl.closeModal();
                          }

                      }, function (error) {
                          console.log('Error while Fetching the Records' + error);
                      });
                  }
              });
          }
      };
      //Delete Action
      var deleteMarks = function (index) {
          if (MarksCtrl.marksList) {
              marksService.deleteAssignment(MarksCtrl.marksList[index].id).then(function (result) {
                  if (result) {
                      //On Successfull refill the data list
                      (new Init()).getAssignmentDetails();
                      MarksCtrl.closeModal();
                  }
              }, function (error) {
                  console.log('Error while deleting class. Error Stack' + error);
              });
          }
      };
  });