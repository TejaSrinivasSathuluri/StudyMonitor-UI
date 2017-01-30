'use strict';

/**
 * @ngdoc service
 * @name studymonitorApp.BusserviceService
 * @description
 * # BusserviceService
 * Service in the studymonitorApp.
 */
angular.module('studymonitorApp')
    .service('BusserviceService', function ($q, BusService, Bus) {
        // AngularJS will instantiate a singleton by calling "new" on this function
        var _serviceList = {};
        this.getBusserviceDetailsBySchoolId = function (schoolId) {
            var _activepromise = $q.defer();
            BusService.find({ filter: { where: { schoolId: schoolId }, include: 'bus' } }, function (response) {
                _activepromise.resolve(response);
            }, function (error) {
                _activepromise.reject(error);
            });
            return _activepromise.promise;
        };
        this.getExistingBusServiceRecords = function (data) {
            var _activepromise = $q.defer();
            BusService.findOne({ filter: { where: { schoolId: data.schoolId, busId: data.busId, serviceNo: data.serviceNo, serviceName: data.serviceName } } },
                function (response) {
                    _activepromise.resolve(response);
                }, function (error) {
                    _activepromise.reject(error);
                });
            return _activepromise.promise;

        };
        this.getBusDetailsBySchoolId = function (schoolId) {
            var _activepromise = $q.defer();
            Bus.find({ filter: { where: { schoolId: schoolId } } },
                function (response) {
                    _activepromise.resolve(response);
                }, function (error) {
                    _activepromise.reject(error);
                });
            return _activepromise.promise;

        };
        this.CreateBusService = function (data) {
            var _activepromise = $q.defer();
            BusService.create(data,
                function (response) {
                    _activepromise.resolve(response);
                }, function (error) {
                    _activepromise.reject(error);
                });
            return _activepromise.promise;

        };
        this.deleteBusSerice = function (assignmentId) {
            var _activepromise = $q.defer();
            BusService.deleteById({ id: assignmentId }, function (response) { _activepromise.resolve(response); }, function (error) { _activepromise.reject(error); }); return _activepromise.promise;
        };
        this.setServicesList = function (data) {
            _serviceList = data;
        };
        this.getServiceList = function () {
            return _serviceList;
        };
    });