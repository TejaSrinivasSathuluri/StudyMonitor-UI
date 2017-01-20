'use strict';

/**
 * @ngdoc service
 * @name studymonitorApp.assignmentsService
 * @description
 * # assignmentsService
 * Service in the studymonitorApp.
 */
angular.module('studymonitorApp')
  .service('assignmentsService', function ($q, Assignment) {
      // AngularJS will instantiate a singleton by calling "new" on this function
      this.getAssignmentDetailsBySchoolId = function (schoolId) {
          var _activepromise = $q.defer();
          Assignment.find({ filter: { where: { schoolId: schoolId }, include: 'class' } }, function (response) {
              _activepromise.resolve(response);
          }, function (error) {
              _activepromise.reject(error);
          });
          return _activepromise.promise;
      }
      this.getExistingAssignmentRecords= function (data){
          var _activepromise = $q.defer();
          Assignment.findOne({filter:{where:{schoolId: data.schoolId, title: data.title, classId: data.classId, fromDate: data.fromDate, toDate: data.toDate}}},
          function (response) {
                  _activepromise.resolve(response);
              }, function (error) {
                  _activepromise.reject(error);
              });
          return _activepromise.promise;

      } 
      this.CreateOrUpdateAssignment= function (data){
          var _activepromise = $q.defer();
          Assignment.create({schoolId: data.schoolId,title: data.title,classId:data.classId,description:data.description,fromDate:data.fromDate,toDate:data.toDate},
          function (response) {
                  _activepromise.resolve(response);
              }, function (error) {
                  _activepromise.reject(error);
              });
          return _activepromise.promise;

      } 
  });
