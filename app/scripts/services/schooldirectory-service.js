'use strict';

/**
 * @ngdoc service
 * @name studymonitorApp.schooldirectoryService
 * @description
 * # schooldirectoryService
 * Service in the studymonitorApp.
 */
angular.module('studymonitorApp')
  .service('schooldirectoryService', function(Student, $q, Staff, StudentParent) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.getStudentsList = function(schoolId) {
      var _activepromise = $q.defer();
      Student.find({
        filter: {
          where: {
            schoolId: schoolId
          },
          include: 'class'
        }
      }, function(response) {
        _activepromise.resolve(response);
      }, function(error) {
        _activepromise.reject(error);
      });
      return _activepromise.promise;
    };
    //Get List of Staff
    this.getStaffList = function(schoolId) {
      var _activepromise = $q.defer();
      Staff.find({
        filter: {
          where: {
            schoolId: schoolId
          }
        }
      }, function(response) {
        _activepromise.resolve(response);
      }, function(error) {
        _activepromise.reject(error);
      });
      return _activepromise.promise;
    };
    //Get Parent List
    this.getParentsListBySchoolId = function(schoolId) {
      var _activepromise = $q.defer();
      StudentParent.find({
        filter: {
          where: {
            schoolId: schoolId
          },
          include: 'parent'
        }
      }, function(response) {
        _activepromise.resolve(response);
      }, function(error) {
        _activepromise.reject(error);
      });
      return _activepromise.promise;
    };
    //Get Parent List by Student
    this.getParentsListByStudent = function(studentId) {
      var _activepromise = $q.defer();
      StudentParent.find({
        filter: {
          where: {
            studentId: studentId
          },
          include: 'parent'
        }
      }, function(response) {
        _activepromise.resolve(response);
      }, function(error) {
        _activepromise.reject(error);
      });
      return _activepromise.promise;
    };
  });
