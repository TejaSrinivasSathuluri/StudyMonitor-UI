'use strict';

/**
 * @ngdoc function
 * @name studymonitorApp.controller:ClasstimetableControllerCtrl
 * @description
 * # ClasstimetableControllerCtrl
 * Controller of the studymonitorApp
 */
angular.module('studymonitorApp')
  .controller('ClasstimetableController', function (classtimetableService, $cookies, $timeout) {
    var ClasstimetableCtrl = this;
    function Init() {

      this.getClasstimetableDetails = function () {
        classtimetableService.getClasstimetableDetailsBySchoolId(ClasstimetableCtrl.schoolId).then(function (result) {
          if (result) {
            ClasstimetableCtrl.timetableList = result;
          }
        }, function (error) {
          console.log('Error while fetching the Classtimetable records. Error stack : ' + error);
        });
      };
      this.getClassDetails = function () {
          classtimetableService.getClassDetailsBySchoolId(ClasstimetableCtrl.schoolId).then(function (result) {
              if (result) {
                  ClasstimetableCtrl.classList = result;
              }
          }, function (error) {
              console.log('Error while fetching the Classtimetable records. Error stack : ' + error);
          });
      };

    }
    (new Init()).getClasstimetableDetails();
    (new Init()).getClassDetails();


    //Initialize the Table Component
    $timeout(function () {
      var columnsDefs = [null, null, null, {
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
      TableEditable.init('#timetable_datatable', columnsDefs);
      Metronic.init();
    });

    //Close or Open modal
    ClasstimetableCtrl.closeModal = function () {
        var modal = $('#edit-timetable');
        modal.modal('hide');

        //ClearFields
        clearformfields();
    };
    ClasstimetableCtrl.openModal = function () {
        var modal = $('#edit-timetable');
        modal.modal('show');
    };
    //Clear Fields
    function clearformfields() {
      ClasstimetableCtrl.formFields = {};
    }

  });
