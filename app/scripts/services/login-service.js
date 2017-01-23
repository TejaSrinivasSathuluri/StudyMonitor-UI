(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name studymonitorApp.loginService
     * @description
     * # loginService
     * Service in the studymonitorApp.
     */
    angular.module('studymonitorApp')
    .service('loginService', function ($http, $q, API_SERVER, School, Admin) {
        // AngularJS will instantiate a singleton by calling "new" on this function
        this.authenticateUser = function (data, role) {
            /*
                * Make an API call depends on user selected role
                * For Admin - authenticateAdmin
                * For Student - authenticateStudent
                * For Parent - authenticateParent
                * For Staff - authenticateStaff
                */
            return Admin.login(data).$promise;
        };

        this.getAuthenticateUserDetails = function (userID, accessToken) {
            return $http.get(API_SERVER + '/Admins/' + userID + '?access_token=' + accessToken)
        };

        this.getSchoolDetailsById = function (schoolId) {
            var _activepromise = $q.defer();

            School.findById({ id: schoolId }, function (response) {
                _activepromise.resolve(response);
            }, function (error) {
                _activepromise.reject(error);
            });
            return _activepromise.promise;
        }
    });
})();
