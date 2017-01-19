'use strict';

/**
 * @ngdoc service
 * @name studymonitorApp.examlistService
 * @description
 * # examlistService
 * Service in the studymonitorApp.
 */
angular.module('studymonitorApp')
  .service('examlistService', function ($q, Exam) {
      // AngularJS will instantiate a singleton by calling "new" on this function
      this.getExamListBySchoolId = function (schoolId) {
          var _activepromise = $q.defer();
          Exam.find({ filter: { where: { schoolId: schoolId }, include: 'class' } }, function (response) {
              _activepromise.resolve(response);
          }, function (error) {
              _activepromise.reject(error);
          });
          return _activepromise.promise;
      }
      this.getExistingExamlists= function (data){
          var _activepromise = $q.defer();
          Exam.findOne({filter:{where:{schoolId: data.schoolId,examName:data.examName,classId:data.classId}}},
          function (response) {
                  _activepromise.resolve(response);
              }, function (error) {
                  _activepromise.reject(response);
              });
          return _activepromise.promise;

      } 
      this.CreateOrUpdateExam= function (data){
          var _activepromise = $q.defer();
          Exam.create({examName:data.examName,classId:data.classId,fromDate:data.fromDate,toDate:data.toDate,schoolId:data.schoolId},
          function (response) {
                  _activepromise.resolve(response);
              }, function (error) {
                  _activepromise.reject(response);
              });
          return _activepromise.promise;

      } 
  });
