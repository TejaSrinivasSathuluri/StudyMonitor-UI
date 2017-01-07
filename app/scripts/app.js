'use strict';

/**
 * @ngdoc overview
 * @name studymonitorApp
 * @description
 * # studymonitorApp
 *
 * Main module of the application.
 */
angular
.module('studymonitorApp', [
 'ngAnimate',
 'ngAria',
 'ngCookies',
 'ngMessages',
 'ngResource',
 'ngRoute',
 'ngSanitize',
 'ngTouch',
 'ui.router',
 'lbServices',
 'frapontillo.bootstrap-switch'
])
.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('login', {
        url: '/login',
        controller: 'LoginController',
        controllerAs: 'LoginCtrl',
        templateUrl: 'views/login.html'
    })
    .state('home', {
        url: '/',
        templateUrl: 'views/main-template.html'
    })
    .state('home.console', {
        url: 'dashboard',
        views: {
            "content": {
                templateUrl: 'views/console.html',
                controller: 'ConsoleController',
                controllerAs: 'ConsoleCtrl'
            },
            "header": {
                templateUrl: 'views/header-template.html'
            },
            "footer": {
                templateUrl: 'views/footer-template.html'
            }
        }
    })
    .state('home.class', {
        url: 'class',
        views: {
            "content": {
                templateUrl: 'views/class-template.html',
                controller: 'ClassController',
                controllerAs: 'ClassCtrl'
            },
            "header": {
                templateUrl: 'views/header-template.html'
            },
            "footer": {
                templateUrl: 'views/footer-template.html'
            }
        }
    })
    .state('home.subjects', {
        url: 'subjects',
        views: {
            "content": {
                templateUrl: 'views/subjects-template.html',
                controller: 'SubjectsController',
                controllerAs: 'SubjectsCtrl'
            },
            "header": {
                templateUrl: 'views/header-template.html'
            },
            "footer": {
                templateUrl: 'views/footer-template.html'
            }
        }
    })
     .state('home.classtimetable', {
        url: 'timetable',
        views: {
            "content": {
                templateUrl: 'views/classtimetable-template.html',
                controller: 'ClasstimetableController',
                controllerAs: 'ClasstimetableCtrl'
            },
            "header": {
                templateUrl: 'views/header-template.html'
            },
            "footer": {
                templateUrl: 'views/footer-template.html'
            }
        }
    })
    .state('home.expenses', {
        url: 'expenses',
        views: {
            "content": {
                templateUrl: 'views/expenses-template.html',
                controller: 'ExpensesController',
                controllerAs: 'ExpensesCtrl'
            },
            "header": {
                templateUrl: 'views/header-template.html'
            },
            "footer": {
                templateUrl: 'views/footer-template.html'
            }
        }
    })
    .state('home.fees', {
        url: 'fees',
        views: {
            "content": {
                templateUrl: 'views/fees-template.html',
                controller: 'FeesController',
                controllerAs: 'FeesCtrl'
            },
            "header": {
                templateUrl: 'views/header-template.html'
            },
            "footer": {
                templateUrl: 'views/footer-template.html'
            }
        }
    })
    .state('home.transport', {
        url: 'transport',
        views: {
            "content": {
                templateUrl: 'views/transport-template.html',
                controller: 'TransportController',
                controllerAs: 'TransportCtrl'
            },
            "header": {
                templateUrl: 'views/header-template.html'
            },
            "footer": {
                templateUrl: 'views/footer-template.html'
            }
        }
    })
     .state('home.directory', {
        url: 'directory',
        views: {
            "content": {
                templateUrl: 'views/directory-template.html',
                controller: 'DirectoryController',
                controllerAs: 'DirectoryCtrl'
            },
            "header": {
                templateUrl: 'views/header-template.html'
            },
            "footer": {
                templateUrl: 'views/footer-template.html'
            }
        }
    })
     .state('home.noticeboard', {
        url: 'noticeboard',
        views: {
            "content": {
                templateUrl: 'views/noticeboard-template.html',
                controller: 'NoticeboardController',
                controllerAs: 'NoticeboardCtrl'
            },
            "header": {
                templateUrl: 'views/header-template.html'
            },
            "footer": {
                templateUrl: 'views/footer-template.html'
            }
        }
    })
    .state('home.assignments', {
        url: 'assignments',
        views: {
            "content": {
                templateUrl: 'views/assignments-template.html',
                controller: 'AssignmentsController',
                controllerAs: 'AssignmentsCtrl'
            },
            "header": {
                templateUrl: 'views/header-template.html'
            },
            "footer": {
                templateUrl: 'views/footer-template.html'
            }
        }
    });
    $urlRouterProvider.otherwise('/login');
}).run(function ($rootScope, $state, $cookies) {
    //Capture an event whenever the route changes
    $rootScope.$on('$stateChangeStart', function (event, nextState, nextParams, currentState, currentParams, options) {
        /*
        * If user Logged in and try to reload or change route then user should be successfully navigates
        * Not logged in but trying to navigate page directly then user should be sent to login screen
        */
        //First condition to check whether user logged in or not
        var uds = $cookies.getObject('uts');
        if (uds === undefined && nextState.name !== 'login') {
            event.preventDefault();
            $state.go('login');
        }
    });
}).constant('API_SERVER', 'http://meanstage.cloudapp.net:3000/api'); //Mean Stage
