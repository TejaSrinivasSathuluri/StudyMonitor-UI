'use strict';

/**
 * @ngdoc service
 * @name studymonitorApp.feesService
 * @description
 * # feesService
 * Service in the studymonitorApp.
 */
angular.module('studymonitorApp')
  .service('feesService', function ($q, FeeSetup, Class) {
      // AngularJS will instantiate a singleton by calling "new" on this function
      this.getFeesDetailsBySchoolId = function (schoolId) {
          var _activepromise = $q.defer();
          FeeSetup.find({ filter: { where: { schoolId: schoolId }, include: 'class' } }, function (response) {
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
      this.getExistingFeeRecords = function (data) {
          var _activepromise = $q.defer();
          FeeSetup.findOne({ filter: { where: { occurance: data.occurance, feeType: data.feeType, classId: data.classId, schoolId: data.schoolId } } },
          function (response) {
              _activepromise.resolve(response);
          }, function (error) {
              _activepromise.reject(error);
          });
          return _activepromise.promise;
      };
      this.CreateOrUpdateFee = function (data) {
          var _activepromise = $q.defer();
          FeeSetup.create({ occurance: data.occurance, feeType: data.feeType, schoolId: data.schoolId, amount: data.amount, classId: data.classId },
          function (response) {
              _activepromise.resolve(response);
          }, function (error) {
              _activepromise.reject(error);
          });
          return _activepromise.promise;
      };
      this.deleteFee = function (feeId) {
          var _activepromise = $q.defer();
          FeeSetup.deleteById({ id: feeId }, function (response) { _activepromise.resolve(response); }, function (error) { _activepromise.reject(error); }); return _activepromise.promise;
      };
  });
