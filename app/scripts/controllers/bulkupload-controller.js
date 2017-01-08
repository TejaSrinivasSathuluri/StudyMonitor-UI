'use strict';

/**
 * @ngdoc function
 * @name studymonitorApp.controller:BulkuploadControllerCtrl
 * @description
 * # BulkuploadControllerCtrl
 * Controller of the studymonitorApp
 */
angular.module('studymonitorApp')
  .controller('BulkuploadController', function ($timeout, classService, $cookies, $rootScope, Student, toastr) {
      var BulkuploadCtrl = this;

      BulkuploadCtrl.schoolId = $cookies.getObject('uds').schoolId;
      BulkuploadCtrl.userData = $cookies.getObject('uds');
      BulkuploadCtrl.schoolData = $cookies.getObject('__s');
      //Defaults
      BulkuploadCtrl.user = BulkuploadCtrl.userData;
      BulkuploadCtrl.school = BulkuploadCtrl.schoolData;
      BulkuploadCtrl.schoolId = BulkuploadCtrl.school.id;
      $rootScope.image = BulkuploadCtrl.school.image;
      BulkuploadCtrl.schoolCode = BulkuploadCtrl.school.code;

      function init() {
          this.getClassList = function () {
              classService.getClassDetails(BulkuploadCtrl.schoolId).then(function (result) {
                  if (result && result.status === 200) {
                      BulkuploadCtrl.classList = result.data;
                  }
              });
          }
      }
      (new init()).getClassList();
      BulkuploadCtrl.uploadFiles = function () {
          var fileData = $('.fileinput:first').fileinput().find('input[type=file]')[0].files[0];
          if (fileData) {
              //CSV Files parsing
              Papa.parse(fileData, {
                  header: true,
                  dynamicTyping: true,
                  complete: function (results) {
                      BulkuploadCtrl.list = results.data;
                      var url = 'http://studymonitor.net/';
                      for (var i = 0; i < BulkuploadCtrl.list.length - 1; i++) {
                          BulkuploadCtrl.list[i].classId = BulkuploadCtrl.classId;
                          BulkuploadCtrl.list[i].dateofBirth = new Date(BulkuploadCtrl.list[i].dateofJoin);
                          BulkuploadCtrl.list[i].dateofJoin = new Date(BulkuploadCtrl.list[i].dateofBirth);
                          BulkuploadCtrl.list[i].image = url + BulkuploadCtrl.schoolCode + '/' + BulkuploadCtrl.list[i].classId + '/' + BulkuploadCtrl.list[i].rollNo + '.png';
                          chkStudent(BulkuploadCtrl.list[i]);
                      }
                  }

              });
          }
      }
      // -----------------------------------------------------
      var data;
      var count = 0;
      var chkStudent = function (student) {
          //  Student Check For Roll No
          Student.findOne({ filter: { where: { classId: student.classId, rollNo: student.rollNo } } },
              function () { },
              function (res) {
                  if (res && res.status === 200) {
                      Student.create({
                          schoolId: BulkuploadCtrl.schoolId,
                          firstName: student.firstName,
                          lastName: student.lastName,
                          email: student.email,
                          password: "123456",
                          gender: student.gender,
                          dateofBirth: student.dateofBirth,
                          rollNo: student.rollNo,
                          RFID: student.RFID,
                          previousSchool: student.previousSchool,
                          dateofJoin: student.dateofJoin,
                          classId: student.classId,
                          regId: student.regId,
                          isDisable: student.isDisable,
                          currentAddress: student.currentAddress,
                          currentCity: student.currentCity,
                          currentState: student.currentState,
                          currentPincode: student.currentPincode,
                          bloodGroup: student.bloodGroup,
                          religion: student.religion,
                          caste: student.caste,
                          alternateContact: student.alternateContact,
                          permanentAddress: student.permanentAddress,
                          permanentCity: student.permanentCity,
                          permanentState: student.permanentState,
                          permanentPincode: student.permanentPincode,
                          nationalId: student.nationalId,
                          motherTounge: student.motherTounge,
                          nationalIdType: student.nationalIdType,
                          subCaste: student.subCaste,
                          contact: student.contact,
                          type: "Student",
                          created: new Date(),
                          image: student.image,
                          fatherName: student.fatherName,
                          motherName: student.motherName,
                          fatherContact: student.fatherContact,
                          motherContact: student.motherContact
                      }, function () {
                          count++;
                          console.log('Student' + count + 'Created Successfully');
                      }, function (response) {
                          console.log(response.data.error.message);
                      });
                  }
              });
      }
  });
