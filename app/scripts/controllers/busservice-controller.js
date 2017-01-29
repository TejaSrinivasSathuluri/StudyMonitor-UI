'use strict';

/**
 * @ngdoc function
 * @name studymonitorApp.controller:BusserviceControllerCtrl
 * @description
 * # BusserviceControllerCtrl
 * Controller of the studymonitorApp
 */
angular.module('studymonitorApp')
    .controller('BusserviceController', function (BusserviceService, $cookies, $timeout, $state) {
        var BusserviceCtrl = this;
        //Get Busservice details by School ID
        BusserviceCtrl.schoolId = $cookies.getObject('uds').schoolId;
        //Defaults
        BusserviceCtrl.routesEditMode = false;

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
            }];
            TableEditable.init('#busservice_datatable', columnsDefs);
            Metronic.init();
        }, 1000);
        //Setting up float label
        BusserviceCtrl.setFloatLabel = function () {
            Metronic.setFlotLabel($('input[name=serviceStartPoint]'));
            Metronic.setFlotLabel($('input[name=serviceDropPoint]'));
            Metronic.setFlotLabel($('input[name=serviceNo]'));
            Metronic.setFlotLabel($('input[name=busId]'));
            Metronic.setFlotLabel($('input[name=servicePickupPointTime]'));
            Metronic.setFlotLabel($('input[name=serviceDropPointTime]'));
        };
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
            BusserviceCtrl.formFields.serviceName = BusserviceCtrl.formFields.serviceStartPoint + BusserviceCtrl.formFields.serviceDropPoint;
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
                        BusserviceCtrl.servicesList = {
                            'schoolId': BusserviceCtrl.schoolId,
                            'busId': BusserviceCtrl.formFields.busId,
                            'serviceNo': BusserviceCtrl.formFields.serviceNo,
                            'serviceName': BusserviceCtrl.formFields.serviceName,
                            'serviceStartPoint': BusserviceCtrl.formFields.serviceStartPoint,
                            'serviceDropPoint': BusserviceCtrl.formFields.serviceDropPoint,
                            'serviceStartTime1': BusserviceCtrl.formFields.servicePickupPointTime,
                            'serviceDropTime1': BusserviceCtrl.formFields.serviceDropPointTime,
                            'serviceRoutes': [{
                                location: BusserviceCtrl.formFields.serviceStartPoint,
                                duration: 0,
                                fee: "",
                                pickUpTime: BusserviceCtrl.formFields.servicePickupPointTime
                            }]
                        };
                        BusserviceService.setServicesList(BusserviceCtrl.servicesList);
                        BusserviceCtrl.closeModal();
                        $timeout(function () {
                            $state.go('home.addRoutes');
                        }, 1000);
                    }
                });
            }
        };
        function convertToDateTime(time) {
            var currentDT = new Date();
            var hours = time.split(':')[0];
            var minutes = time.split(':')[1];
            return currentDT.setHours(hours, minutes);
        }
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

        //Date Change event
        $('#servicepickup').on('dp.change', function () {
            BusserviceCtrl.formFields.servicePickupPointTime = $(this).val();
        });
        $('#servicedrop').on('dp.change', function () {
            BusserviceCtrl.formFields.serviceDropPointTime = $(this).val();
        });
        $('#routetime').on('dp.change', function () {
            BusserviceCtrl.formFields.routeTime = $(this).val();
        });

        /* ========================= Route Section ============================= */
        BusserviceCtrl.addRoutes = function (invalid) {
            if (invalid) {
                return;
            }
            if (BusserviceCtrl.routesEditMode) {
                BusserviceCtrl.servicesList.serviceRoutes[BusserviceCtrl.routeIndex].location = BusserviceCtrl.formFields.routeLocation;
                BusserviceCtrl.servicesList.serviceRoutes[BusserviceCtrl.routeIndex].duration = BusserviceCtrl.formFields.routeDuration;
                BusserviceCtrl.servicesList.serviceRoutes[BusserviceCtrl.routeIndex].fee = BusserviceCtrl.formFields.routeFees;
                BusserviceCtrl.servicesList.serviceRoutes[BusserviceCtrl.routeIndex].pickUpTime = BusserviceCtrl.formFields.routeTime;

                BusserviceCtrl.routesEditMode = false;
            }
            else {
                BusserviceCtrl.servicesList.serviceRoutes.push({
                    'location': BusserviceCtrl.formFields.routeLocation,
                    'duration': BusserviceCtrl.formFields.routeDuration,
                    'fee': BusserviceCtrl.formFields.routeFees,
                    'pickUpTime': BusserviceCtrl.formFields.routeTime
                });
            }
            BusserviceCtrl.closeRoutesModal();
        };
        //Close Routes modal
        BusserviceCtrl.closeRoutesModal = function () {
            var modal = $('#edit-routes');
            modal.modal('hide');

            BusserviceCtrl.clearRoutesFormFields();
        };
        //Open Routes modal
        BusserviceCtrl.openRoutesModal = function () {
            var modal = $('#edit-routes');
            modal.modal('show');
        };
        //Clear FormFileds
        BusserviceCtrl.clearRoutesFormFields = function () {
            BusserviceCtrl.formFields.routeLocation = "";
            BusserviceCtrl.formFields.routeDuration = "";
            BusserviceCtrl.formFields.routeFees = "";
            BusserviceCtrl.formFields.routeTime = "";
        }
        //Save Routes
        BusserviceCtrl.saveRoutes = function () {
            if (BusserviceCtrl.servicesList) {
                var duration = BusserviceCtrl.servicesList.serviceRoutes[BusserviceCtrl.servicesList.serviceRoutes.length - 1].duration;
                var servicepickuppointtime = new Date(convertToDateTime(BusserviceCtrl.servicesList.serviceStartTime1));
                var servicedroppointtime = new Date(convertToDateTime(BusserviceCtrl.servicesList.serviceDropTime1));
                var servicestarttime2 = new Date(servicepickuppointtime.getTime() + duration);
                var servicedroptime2 = new Date(servicedroppointtime.getTime() + duration);

                BusserviceCtrl.servicesList.serviceStartTime1 = servicepickuppointtime;
                BusserviceCtrl.servicesList.serviceDropTime1 = servicedroppointtime;
                BusserviceCtrl.servicesList.serviceStartTime2 = servicestarttime2;
                BusserviceCtrl.servicesList.serviceDropTime2 = servicedroptime2;

                BusserviceService.CreateBusService(BusserviceCtrl.servicesList).then(function (result) {
                    if (result) {
                        $state.go('home.busservice');
                    }
                }, function (error) {
                    if (error) {
                        console.log('Error while creating bus services. Error stack ' + error);
                    }
                });
            }
        }
        //Set Routes Float Label
        BusserviceCtrl.setRouteFloatLabel = function () {
            Metronic.setFlotLabel($('input[name=routelocation]'));
            Metronic.setFlotLabel($('input[name=routeduration]'));
            Metronic.setFlotLabel($('input[name=routetime]'));
            Metronic.setFlotLabel($('input[name=routefees]'));
        };
        //Edit Mode
        function routeseditMode(index) {
            BusserviceCtrl.formFields.routeLocation = BusserviceCtrl.servicesList.serviceRoutes[index].location;
            BusserviceCtrl.formFields.routeDuration = BusserviceCtrl.servicesList.serviceRoutes[index].duration;
            BusserviceCtrl.formFields.routeTime = BusserviceCtrl.servicesList.serviceRoutes[index].pickUpTime;
            BusserviceCtrl.formFields.routeFees = BusserviceCtrl.servicesList.serviceRoutes[index].fee;
            BusserviceCtrl.routeIndex = index;

            $timeout(function () {
                BusserviceCtrl.openRoutesModal();
                BusserviceCtrl.setRouteFloatLabel();
            });
        }
        //Get Existing Service list
        if ($state && $state.current.name === 'home.addRoutes') {
            BusserviceCtrl.servicesList = BusserviceService.getServiceList();
            if (BusserviceCtrl.servicesList && BusserviceCtrl.servicesList.hasOwnProperty('serviceRoutes') && BusserviceCtrl.servicesList.serviceRoutes.length > 0) {
                BusserviceCtrl.routesEditMode = true;
                //Set Fields Values in EditMode
                BusserviceCtrl.formFields = {};
                routeseditMode(0);
            }
            else {
                $state.go('home.busservice');
            }
        };
        //Remove Route
        BusserviceCtrl.removeRoute = function (index) {
            BusserviceCtrl.servicesList.serviceRoutes.splice(index, 1);
        }
        //EditRoutes
        BusserviceCtrl.editRoutes = function (index) {

            routeseditMode(index);
        }
        /* ========================= Route Section End ========================= */
    });