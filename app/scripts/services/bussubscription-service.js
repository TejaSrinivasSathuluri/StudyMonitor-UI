'use strict';

/**
 * @ngdoc service
 * @name studymonitorApp.BussubscriptionService
 * @description
 * # BussubscriptionService
 * Service in the studymonitorApp.
 */
angular.module('studymonitorApp')
  .service('BussubscriptionService', function ($q, BusService, BusSubscription, Class, Student) {
      // AngularJS will instantiate a singleton by calling "new" on this function
      this.getBussubscriptionDetailsBySchoolId = function (schoolId) {
          var _activepromise = $q.defer();
          BusSubscription.find({ filter: { where: { schoolId: schoolId }, include: [{ relation: 'busService' }, { relation: 'student', scope: { include: { relation: 'class' } } }] } }, function (response) {
              _activepromise.resolve(response);
          }, function (error) {
              _activepromise.reject(error);
          });
          return _activepromise.promise;
      };
      this.getExistingBussubscriptionRecords = function (data) {
          var _activepromise = $q.defer();
          BusSubscription.findOne({ filter: { where: { schoolId: data.schoolId, title: data.title, classId: data.classId, subjectId: data.subjectId, fromDate: data.fromDate, toDate: data.toDate } } },
              function (response) {
                  _activepromise.resolve(response);
              }, function (error) {
                  _activepromise.reject(error);
              });
          return _activepromise.promise;

      };
      this.getBusserviceDetailsBySchoolId = function (schoolId) {
          var _activepromise = $q.defer();
          BusService.find({ filter: { where: { schoolId: schoolId }, include: 'bus' } },
              function (response) {
                  _activepromise.resolve(response);
              }, function (error) {
                  _activepromise.reject(error);
              });
          return _activepromise.promise;

      };
      this.getClassDetailsBySchoolId = function (schoolId) {
          var _activepromise = $q.defer();
          Class.find({ filter: { where: { schoolId: schoolId } } }, function (response) {
              _activepromise.resolve(response);
          }, function (error) {
              _activepromise.reject(error);
          });
          return _activepromise.promise;
      };
      this.getStudentDetailsBySchoolId = function (schoolId) {
          var _activepromise = $q.defer();
          Student.find({ filter: { where: { schoolId: schoolId } } }, function (response) {
              _activepromise.resolve(response);
          }, function (error) {
              _activepromise.reject(error);
          });
          return _activepromise.promise;
      };
      this.CreateBussubscription = function (data) {
          var _activepromise = $q.defer();
          BusSubscription.create({ busServiceId: data.busServiceId, studentId: data.studentId, pickupLocation: data.pickupLocation, schoolId: data.schoolId },
              function (response) {
                  _activepromise.resolve(response);
              }, function (error) {
                  _activepromise.reject(error);
              });
          return _activepromise.promise;

      };
      this.deleteBussubscription = function (bussubscriptionId) {
          var _activepromise = $q.defer();
          BusService.deleteById({ id: bussubscriptionId }, function (response) { _activepromise.resolve(response) }, function (error) { _activepromise.reject(error) }); return _activepromise.promise;
      };
      this.getRoutesByServiceId = function (serviceId) {
          var _activepromise = $q.defer();
          BusService.findById({ id: serviceId }, function (response) {
              _activepromise.resolve(response);
          }, function (error) {
              _activepromise.reject(error);
          });
          return _activepromise.promise;
      }
  });