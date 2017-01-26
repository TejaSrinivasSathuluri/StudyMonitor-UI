'use strict';

/**
 * @ngdoc service
 * @name studymonitorApp.subjectsService
 * @description
 * # subjectsService
 * Service in the studymonitorApp.
 */
angular.module('studymonitorApp')
  .service('subjectsService', function ($q, Subject, School) {
      // AngularJS will instantiate a singleton by calling "new" on this function
      this.getSubjectListBySchoolId = function (schoolId) {
          var _activepromise = $q.defer();
          Subject.find({ filter: { where: { schoolId: schoolId }, include: ['staff', 'class'] } }, function (response) {
              _activepromise.resolve(response);
          }, function (error) {
              _activepromise.reject(error);
          });
          return _activepromise.promise;
      };
      //Verify data exists or not
      this.verifyDataExistsOrNot = function (data) {
          var _activepromise = $q.defer();
          Subject.findOne({ filter: { where: { schoolId: data.schoolId, classId: data.classId, subjectName: data.subjectName } } }, function (response) {
              _activepromise.resolve(response);
          }, function (error) {
              _activepromise.reject(error);
          });
          return _activepromise.promise;
      };
      //get Staff or class List
      this.getClassAndStaffList = function (schoolId) {
          var _activepromise = $q.defer();
          School.findOne({ filter: { where: { id: schoolId }, include: ['classes', 'staffs'] } }, function (response) {
              _activepromise.resolve(response);
          }, function (error) {
              _activepromise.reject(error);
          });
          return _activepromise.promise;
      };
      //Create New Subject
      this.CreateSubject = function (data) {
          var _activepromise = $q.defer();
          Subject.create({ schoolId: data.schoolId, classId: data.classId, subjectName: data.subjectName, staffId: data.staffId, examFlag: data.examFlag }, function (response) {
              _activepromise.resolve(response);
          }, function (error) {
              _activepromise.reject(error);
          });
          return _activepromise.promise;
      };
      //Delete Subject
      this.deleteSubject = function (subjectId) {
          var _activepromise = $q.defer();
          Subject.deleteById({ id: subjectId }, function (response) { _activepromise.resolve(response); }, function (error) { _activepromise.reject(error); }); return _activepromise.promise;
      };
      //Update Subject
      this.updateSubject = function (data) {
          var _activepromise = $q.defer();
          Subject.upsert({ id: data.id, staffId: data.id, examFlag: data.examFlag }, function (response) {
              _activepromise.resolve(response);
          }, function (response) {
              _activepromise.reject(response);
          });
          return _activepromise.promise;
      };
  });
