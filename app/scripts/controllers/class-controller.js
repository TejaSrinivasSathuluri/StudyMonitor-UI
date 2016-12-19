'use strict';

/**
 * @ngdoc function
 * @name studymonitorApp.controller:ClassControllerCtrl
 * @description
 * # ClassControllerCtrl
 * Controller of the studymonitorApp
 */
angular.module('studymonitorApp')
  .controller('ClassController', function ($log, $timeout, classService, APP_MESSAGES, $cookies, $state) {
      var ClassCtrl = this;

      function init() {
          //var GetClassDetails = function () {
          ClassCtrl.schoolId = $cookies.getObject('uds').schoolId;
          classService.getClassDetails(ClassCtrl.schoolId).then(function (result) {
              if (result && result.status === 200) {
                  if (result.data.length > 0) {
                      ClassCtrl.classList = result.data;
                      /**
                       * @getStaffBySchoolID service
                       * @description
                       * Get details of staff exists by school ID and relate it to classlist array
                       * to display in datatable
                       */
                      classService.getStaffBySchoolID(ClassCtrl.schoolId).then(function (response) {
                          if (response && response.status === 200) {
                              ClassCtrl.staffList = response.data;
                              angular.forEach(ClassCtrl.classList, function (value, index) {
                                  var staffObject = ClassCtrl.staffList.filter(function (staff) {
                                      return staff.id == value.staffId;
                                  });

                                  if (staffObject && staffObject.length > 0) {
                                      value.staffName = staffObject[0].firstName + ' ' + staffObject[0].lastName;
                                  }
                              });
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
                                  TableEditable.init("#class_datatable", columnsDefs);
                              });
                          }
                      }, function (errorResponse) {
                          console.log('Error while fetching staff records. ErrorStack : ' + errorResponse);
                      });
                  }
              }
          }, function (error) {
              if (error) {
                  console.log(error);
              }
          });
          //}
      }
      init();

      ////Table Properties
      //ClassCtrl.classdtOptions = [
      //    DTOptionsBuilder.newOptions().withDOM('lrtip')
      //];
  });
