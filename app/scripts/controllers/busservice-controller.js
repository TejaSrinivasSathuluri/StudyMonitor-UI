'use strict';

/**
 * @ngdoc function
 * @name studymonitorApp.controller:BusserviceControllerCtrl
 * @description
 * # BusserviceControllerCtrl
 * Controller of the studymonitorApp
 */
angular.module('studymonitorApp')
  .controller('BusserviceController', function (BusserviceService, $cookies, $timeout) {
      var BusserviceCtrl = this;
      //Get Busservice details by School ID
      BusserviceCtrl.schoolId = $cookies.getObject('uds').schoolId;

      function Init() {

          this.getBusserviceDetails = function () {
              BusserviceService.getBusserviceDetailsBySchoolId(BusserviceCtrl.schoolId).then(function (result) {
                  if (result) {
                      BusserviceCtrl.busserviceList = result;
                  }
              }, function (error) {
                  console.log('Error while fetching the Busservice records. Error stack : ' + error);
              });
          };
          this.getBusDetails = function () {
              BusserviceService.getBusDetailsBySchoolId(BusserviceCtrl.schoolId).then(function (result) {
                  if (result) {
                      BusserviceCtrl.busList = result;
                  }
              }, function (error) {
                  console.log('Error while fetching the Busservice records. Error stack : ' + error);
              });
          };
      }
      (new Init()).getBusserviceDetails();
      (new Init()).getBusDetails();
      //Initialize the Table Component
      $timeout(function () {
          var columnsDefs = [null, null, {
              'width': '30%'
          }, {
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
          TableEditable.init('#busservice_datatable', columnsDefs);
          Metronic.init();
      }, 1000);
      //Close or Open modal
      BusserviceCtrl.closeModal = function () {
          var modal = $('#edit-busservice');
          modal.modal('hide');

          //ClearFields
          clearformfields();
      };
      BusserviceCtrl.openModal = function () {
          var modal = $('#edit-busservice');
          modal.modal('show');
      };
      //Clear Fields
      function clearformfields() {
          BusserviceCtrl.formFields = {};
      }
      //Delete confirmation box
      BusserviceCtrl.confirmCallbackMethod = function (index) {
          deleteBusSerice(index);
      };
      //Delete cancel box
      BusserviceCtrl.confirmCallbackCancel = function () {
          return false;
      };
      // Add Action
      BusserviceCtrl.serviceAction = function (invalid) {
          if (invalid) {
              return;
          }
          var data = {
              schoolId: BusserviceCtrl.schoolId,
              busId: BusserviceCtrl.formFields.busId,
              serviceNo: BusserviceCtrl.formFields.serviceNo,
              serviceName: BusserviceCtrl.formFields.serviceName
          };
          if (data) {
              BusserviceService.getExistingBusServiceRecords(data).then(function (result) {
                  if (result) {
                      console.log('data already exists');
                      return;
                  }
              }, function (result1) {
                  if (result1) {
                      BusserviceService.CreateOrUpdateBusService(data).then(function (res) {
                          if (res) {
                              (new Init()).getBusserviceDetails();
                              BusserviceCtrl.closeModal();
                          }

                      }, function (error) {
                          console.log('Error while Fetching the Records' + error);
                      });
                  }
              });
          }
      };
      //Delete Action
      var deleteBusSerice = function (index) {
          if (BusserviceCtrl.busserviceList) {
              BusserviceService.deleteBusSerice(BusserviceCtrl.busserviceList[index].id).then(function (result) {
                  if (result) {
                      //On Successfull refill the data list
                      (new Init()).getBusserviceDetails();
                      BusserviceCtrl.closeModal();
                  }
              }, function (error) {
                  console.log('Error while deleting Busservice. Error Stack' + error);
              });
          }
      };
  });