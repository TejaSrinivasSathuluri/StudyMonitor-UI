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
        this.getBusserviceDetailsBySchoolId = function (schoolId) {
            var _activepromise = $q.defer();
            BusService.find({ filter: { where: { schoolId: schoolId }, include: 'bus' } }, function (response) {
                _activepromise.resolve(response);
            }, function (error) {
                _activepromise.reject(error);
            });
            return _activepromise.promise;
        }
        this.getExistingBusServiceRecords = function (data) {
            var _activepromise = $q.defer();
            BusService.findOne({ filter: { where: { schoolId: data.schoolId, title: data.title, classId: data.classId, subjectId: data.subjectId,fromDate: data.fromDate, toDate: data.toDate } } },
                function (response) {
                    _activepromise.resolve(response);
                }, function (error) {
                    _activepromise.reject(error);
                });
            return _activepromise.promise;

        }
        this.getBusDetailsBySchoolId = function (data) {
            var _activepromise = $q.defer();
            Bus.findOne({ filter: { where: { schoolId: data.schoolId } } },
                function (response) {
                    _activepromise.resolve(response);
                }, function (error) {
                    _activepromise.reject(error);
                });
            return _activepromise.promise;

        }
        this.CreateOrUpdateBusService = function (data) {
            var _activepromise = $q.defer();
            BusService.create({ schoolId: data.schoolId, title: data.title, classId: data.classId, subjectId: data.subjectId,description: data.description, fromDate: data.fromDate, toDate: data.toDate },
                function (response) {
                    _activepromise.resolve(response);
                }, function (error) {
                    _activepromise.reject(error);
                });
            return _activepromise.promise;

        }
        this.deleteBusSerice = function (assignmentId) {
            var _activepromise = $q.defer();
            BusService.deleteById({ id: assignmentId }, function (response) { _activepromise.resolve(response) }, function (error) { _activepromise.reject(error) }); return _activepromise.promise;
        }
  });