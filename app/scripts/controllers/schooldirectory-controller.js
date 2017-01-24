'use strict';

/**
 * @ngdoc function
 * @name studymonitorApp.controller:SchooldirectoryControllerCtrl
 * @description
 * # SchooldirectoryControllerCtrl
 * Controller of the studymonitorApp
 */
 angular.module('studymonitorApp')
 .controller('SchooldirectoryController', function($cookies, schooldirectoryService, $scope, $timeout) {
  var SchooldirectoryCtrl = this;
    //Defaults
    SchooldirectoryCtrl.directorList = [];
    SchooldirectoryCtrl.studentsList = [];
    SchooldirectoryCtrl.staffList = [];
    SchooldirectoryCtrl.parentList = [];
    //SchooldirectoryCtrl.searchSelection = 'Students';

    SchooldirectoryCtrl.schoolId = $cookies.getObject('uds').schoolId;

    function init() {
      this.getStudentsList = function() {
        schooldirectoryService.getStudentsList(SchooldirectoryCtrl.schoolId).then(function(result) {
          if (result) {
            SchooldirectoryCtrl.studentsList = result;
            
            //Call Metronic
            Metronic.init();
          }
        }, function(error) {
          console.log('Error while fectching records for Student in school directory. Error stack' + error);
        });
      };
      this.getStaffList = function() {
        schooldirectoryService.getStaffList(SchooldirectoryCtrl.schoolId).then(function(result) {
          if (result) {
            SchooldirectoryCtrl.staffList = result;
          }
        }, function(error) {
          console.log('Error while fecthing records for Staff in school director. Error stack' + error);
        });
      };
      this.getParentsList = function() {
        schooldirectoryService.getParentsListBySchoolId(SchooldirectoryCtrl.schoolId).then(function(result) {
          if (result) {
            SchooldirectoryCtrl.parentList = result;
          }
        }, function(error) {
          console.log('Error while fecthing records for Staff in school director. Error stack' + error);
        });
      };
    }
    // Make an call to functions
    (new init()).getStudentsList();
    (new init()).getStaffList();
    (new init()).getParentsList();

    $timeout(function(){
     var columnsDefs = [{
      "width":"10%"
    }, {
      "width":"10%"
    }, {
      "width":"10%"
    }, {
      "width":"10%",
    }, {
      "width":"10%"
    }, {
      "width":"10%"
    }, {
      "width":"10%"
    }, {
      'orderable': false,
      'width': '10%',
      'targets': 0
    }, {
      'orderable': false,
      'width': '10%',
      'targets': 0
    }];
    TableEditable.init('#schooldirectory_datatable', columnsDefs);
  });
    /*
     * Watch an expression and load the data respectively
     * If Student radio button is selected then bind directoryList to StudentList and
     * Same things goes for the other two options
     */
     $scope.$watch('SchooldirectoryCtrl.searchSelection', function(newValue, oldValue) {
      if (newValue && newValue != oldValue) {
        switch (newValue) {
          case 'Students':
          SchooldirectoryCtrl.directorList = SchooldirectoryCtrl.studentsList;
          break;
          case 'Parents':
          SchooldirectoryCtrl.directorList = SchooldirectoryCtrl.parentList;
          break;
          case 'Staff':
          SchooldirectoryCtrl.directorList = SchooldirectoryCtrl.staffList;
          break;
        }
      }
    });
   });
