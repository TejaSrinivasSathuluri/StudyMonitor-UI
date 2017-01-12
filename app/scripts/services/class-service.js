'use strict';

/**
 * @ngdoc service
 * @name studymonitorApp.classService
 * @description
 * # classService
 * Service in the studymonitorApp.
 */
angular.module('studymonitorApp')
  .service('classService', function ($http, $q, API_SERVER, $cookies, Class, School) {
      // AngularJS will instantiate a singleton by calling "new" on this function
      this.getClassDetails = function (schoolId) {
          var _activepromise = $q.defer();
          School.findOne({ filter: { where: { id: schoolId }, include: [{ relation: 'classes', scope: { include: [{ relation: 'subjects', scope: { include: 'staff' } }, { relation: 'staff' }] } }, { relation: 'staffs' }] } },
              function (response) {
                  _activepromise.resolve(response);
              },
              function (error) {
                  _activepromise.reject(error);
              });
          return _activepromise.promise;
      };
      this.getClassTeacherByID = function (staffId) {
          return $http.get(API_SERVER + '/Staffs/' + staffId + '?access_token=' + $cookies.getObject('uts').accessToken);
      };
      this.getStaffBySchoolID = function (schoolId) {
          return $http.get(API_SERVER + '/Schools/' + schoolId + '/staffs?access_token=' + $cookies.getObject('uts').accessToken);
      };
      this.classAddOrUpdate = function (data) {
          var _activepromise = $q.defer();
          Class.upsert(data, function (response) {
              _activepromise.resolve(response);
          }, function (error) {
              _activepromise.reject(error);
          });
          return _activepromise.promise;
      };
      this.deleteClass = function (classId) {
          var _activepromise = $q.defer();
          Class.deleteById({ id: classId }, function (response) { _activepromise.resolve(response) }, function (error) { _activepromise.reject(error) }); return _activepromise.promise;
      }
  });
