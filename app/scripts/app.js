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
 'frapontillo.bootstrap-switch',
 'ui.calendar'
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
    })
    .state('home.exams', {
        url: 'exams',
        views: {
            "content": {
                templateUrl: 'views/examlist-template.html',
                controller: 'ExamlistController',
                controllerAs: 'ExamlistCtrl'
            },
            "header": {
                templateUrl: 'views/header-template.html'
            },
            "footer": {
                templateUrl: 'views/footer-template.html'
            }
        }
    })
    .state('home.grade', {
        url: 'grades',
        views: {
            "content": {
                templateUrl: 'views/grade-template.html',
                controller: 'GradeController',
                controllerAs: 'GradeCtrl'
            },
            "header": {
                templateUrl: 'views/header-template.html'
            },
            "footer": {
                templateUrl: 'views/footer-template.html'
            }
        }
    })
    .state('home.library', {
        url: 'library',
        views: {
            "content": {
                templateUrl: 'views/library-template.html',
                controller: 'LibraryController',
                controllerAs: 'LibraryCtrl'
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
    .state('home.schooltimetable', {
        url: 'schoool/timetable',
        views: {
            "content": {
                templateUrl: 'views/schooltimetable-template.html',
                controller: 'SchooltimetableController',
                controllerAs: 'SchooltimetableCtrl'
            },
            "header": {
                templateUrl: 'views/header-template.html'
            },
            "footer": {
                templateUrl: 'views/footer-template.html'
            }
        }
    })
    .state('404', {
        templateUrl: '404.html',
        url: '/404'
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
