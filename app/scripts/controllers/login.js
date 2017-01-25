'use strict';

/**
 * @ngdoc function
 * @name studymonitorApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the studymonitorApp
 */
angular.module('studymonitorApp')
    .controller('LoginController', function (loginService, $timeout, $cookies, APP_MESSAGES, $state, toastr) {
        var LoginCtrl = this;


        //@@TODO - Clear the below lines while production
        $timeout(function () {
            LoginCtrl.loginfields = {};
            LoginCtrl.loginfields.username = 'mkshetty@sm.in';
            LoginCtrl.loginfields.password = 'admin';
            LoginCtrl.loginfields.role = 'Admin';
        });
        //@@TODO - Clear the above lines in prod

        LoginCtrl.authenticateUser = function (invalid) {
            if (invalid) {
                return;
            }
            var data = {
                "email": LoginCtrl.loginfields.username,
                "password": LoginCtrl.loginfields.password
            };

            if (data) {
                if (LoginCtrl.loginfields.role) {
                    //Make an API Call to authentical
                    //Params @email,@password and @role
                    loginService.authenticateUser(data, LoginCtrl.loginfields.role).then(function (response) {
                        if (response) {
                            $cookies.putObject('uts', {
                                accessToken: response.id,
                                userId: response.userId
                            });
                            loginService.getAuthenticateUserDetails(response.userId, response.id).then(function (result) {
                                if (result && result.status === 200) {
                                    $cookies.putObject('uds', result.data);
                                    loginService.getSchoolDetailsById(result.data.schoolId).then(function (res) {
                                        if (res) {
                                            $cookies.putObject('__s', res);
                                            $state.go('home.console'); //Navigate to console landing page on successfull login
                                            //Show Toast Message Success
                                            toastr.success(APP_MESSAGES.LOGIN_SUCCESS);
                                        }
                                    });
                                }
                            }, function (error) {
                                LoginCtrl.showError = true;
                                LoginCtrl.errorMessage = APP_MESSAGES.LOGIN_INVALID;
                            });
                        }
                    }, function (error) {
                        if (error) {
                            if (error.status === 401) {
                                LoginCtrl.showError = true;
                                LoginCtrl.errorMessage = APP_MESSAGES.LOGIN_INVALID;
                            }
                        }
                    });
                }
            }

        }
    });
