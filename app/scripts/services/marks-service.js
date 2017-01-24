'use strict';

/**
 * @ngdoc service
 * @name studymonitorApp.marksService
 * @description
 * # marksService
 * Service in the studymonitorApp.
 */
angular.module('studymonitorApp')
  .service('marksService', function ($q, Marks, Class,Subject,Exam,MaxMark) {
    // AngularJS will instantiate a singleton by calling "new" on this function
        this.getMarksDetailsBySchoolId = function (schoolId) {
            var _activepromise = $q.defer();
            Marks.find({ filter: { where: { schoolId: schoolId }, include: 'class' } }, function (response) {
                _activepromise.resolve(response);
            }, function (error) {
                _activepromise.reject(error);
            });
            return _activepromise.promise;
        }
        this.getClassDetailsBySchoolId = function (schoolId) {
            var _activepromise = $q.defer();
            Class.find({ filter: { where: { schoolId: schoolId } } }, function (response) {
                _activepromise.resolve(response);
            }, function (error) {
                _activepromise.reject(error);
            });
            return _activepromise.promise;
        }
        this.getSubjectDetailsBySchoolId = function (schoolId) {
            var _activepromise = $q.defer();
            Subject.find({ filter: { where: { schoolId: schoolId } } }, function (response) {
                _activepromise.resolve(response);
            }, function (error) {
                _activepromise.reject(error);
            });
            return _activepromise.promise;
        }
        this.getExamDetailsBySchoolId = function (schoolId) {
            var _activepromise = $q.defer();
            Exam.find({ filter: { where: { schoolId: schoolId } } }, function (response) {
                _activepromise.resolve(response);
            }, function (error) {
                _activepromise.reject(error);
            });
            return _activepromise.promise;
        }
        this.getExistingMarksRecords = function (data) {
            var _activepromise = $q.defer();
            Marks.findOne({ filter: { where: { schoolId: data.schoolId, title: data.title, classId: data.classId, subjectId: data.subjectId,fromDate: data.fromDate, toDate: data.toDate } } },
                function (response) {
                    _activepromise.resolve(response);
                }, function (error) {
                    _activepromise.reject(error);
                });
            return _activepromise.promise;

        }
        this.CreateOrUpdateMarks = function (data) {
            var _activepromise = $q.defer();
            Marks.create({ schoolId: data.schoolId, title: data.title, classId: data.classId, subjectId: data.subjectId,description: data.description, fromDate: data.fromDate, toDate: data.toDate },
                function (response) {
                    _activepromise.resolve(response);
                }, function (error) {
                    _activepromise.reject(error);
                });
            return _activepromise.promise;

        }
        this.deleteMarks = function (marksId) {
            var _activepromise = $q.defer();
            Marks.deleteById({ id: marksId }, function (response) { _activepromise.resolve(response) }, function (error) { _activepromise.reject(error) }); return _activepromise.promise;
        }
  });
