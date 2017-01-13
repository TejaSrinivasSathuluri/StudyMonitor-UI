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
      ClassCtrl.formFields = {};

      function init() {
          //var GetClassDetails = function () {
          ClassCtrl.schoolId = $cookies.getObject('uds').schoolId;
          classService.getClassDetails(ClassCtrl.schoolId).then(function (result) {
              if (result && result.hasOwnProperty('classes')) {
                  ClassCtrl.classList = result.classes;
                  ClassCtrl.staffList = result.staffs;
                  //Initialize metronic
                  Metronic.init();
              }
          }, function (error) {
              if (error) {
                  console.log("Error while fecthing class records. Error stack: " + error);
              }
          });
          //}
      }
      init();

      /*
       * Actions - For Create a new Class
       * Actions - For Updating the existing records
       */
      ClassCtrl.classAction = function (invalid) {
          if (invalid) {
              return;
          }
          var data = {
              schoolId: ClassCtrl.schoolId,
              className: ClassCtrl.formFields.className,
              sectionName: ClassCtrl.formFields.sectionName,
              staffId: ClassCtrl.formFields.staffName
          }
          if (data) {
              classService.classAddOrUpdate(data).then(function (result) {
                  if (result) {
                      //On Successfull refill the data list
                      init();
                      //Close Modal
                      ClassCtrl.closeModal();
                  }
              }, function (error) {
                  console.log('Error while creating or updating records. Error stack' + error);
              });
          }
      }
      //Delete Action
      var deleteClass = function (index) {
          if (ClassCtrl.classList) {
              classService.deleteClass(ClassCtrl.classList[index].id).then(function (result) {
                  if (result) {
                      //On Successfull refill the data list
                      init();
                      ClassCtrl.closeModal();
                  }
              }, function (error) {
                  console.log('Error while deleting class. Error Stack' + error);
              });
          }
      }
      //Edit Action
      ClassCtrl.editClass = function (index) {
          ClassCtrl.formFields.className = ClassCtrl.classList[index].className;
          ClassCtrl.formFields.sectionName = ClassCtrl.classList[index].sectionName;
          ClassCtrl.formFields.staffName = ClassCtrl.classList[index].staff.firstName + ' ' + ClassCtrl.classList[index].staff.lastName;

          //Open Modal
          openModal();

          $timeout(function () {
              Metronic.setFlotLabel($('input[name=sectionname]'));
              Metronic.setFlotLabel($('input[name=classname]'));
              Metronic.setFlotLabel($('input[name=staffname]'));
          });

      }

      //Close or Open modal
      ClassCtrl.closeModal = function () {
          var modal = $('#edit-class');
          modal.modal('hide');

          //ClearFields
          clearformfields();
      }
      function openModal() {
          var modal = $('#edit-class');
          modal.modal('show');
      }
      //Clear Fields
      function clearformfields() {
          ClassCtrl.formFields = {};
      }

      //Delete confirmation box
      ClassCtrl.confirmCallbackMethod = function (index) {
          deleteClass(index);
      }
      //Delete cancel box
      ClassCtrl.confirmCallbackCancel = function (index) {
          return false;
      }
  });
