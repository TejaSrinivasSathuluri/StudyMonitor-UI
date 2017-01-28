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
 'ui.calendar',
 'toastr',
 'ngBootbox'
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
            'content': {
                templateUrl: 'views/console.html',
                controller: 'ConsoleController',
                controllerAs: 'ConsoleCtrl'
            },
            'header': {
                templateUrl: 'views/header-template.html',
                controller: 'HeaderController',
                controllerAs: 'HeaderCtrl'
            },
            'footer': {
                templateUrl: 'views/footer-template.html'
            }
        }
    })
    .state('home.class', {
        url: 'class',
        views: {
            'content': {
                templateUrl: 'views/class-template.html',
                controller: 'ClassController',
                controllerAs: 'ClassCtrl'
            },
            'header': {
                templateUrl: 'views/header-template.html',
                controller: 'HeaderController',
                controllerAs: 'HeaderCtrl'
            },
            'footer': {
                templateUrl: 'views/footer-template.html'
            }
        }
    })
    .state('home.subjects', {
        url: 'subjects',
        views: {
            'content': {
                templateUrl: 'views/subjects-template.html',
                controller: 'SubjectsController',
                controllerAs: 'SubjectsCtrl'
            },
            'header': {
                templateUrl: 'views/header-template.html',
                controller: 'HeaderController',
                controllerAs: 'HeaderCtrl'
            },
            'footer': {
                templateUrl: 'views/footer-template.html'
            }
        }
    })
    .state('home.expenses', {
        url: 'expenses',
        views: {
            'content': {
                templateUrl: 'views/expenses-template.html',
                controller: 'ExpensesController',
                controllerAs: 'ExpensesCtrl'
            },
            'header': {
                templateUrl: 'views/header-template.html',
                controller: 'HeaderController',
                controllerAs: 'HeaderCtrl'
            },
            'footer': {
                templateUrl: 'views/footer-template.html'
            }
        }
    })
    .state('home.fees', {
        url: 'fees',
        views: {
            'content': {
                templateUrl: 'views/fees-template.html',
                controller: 'FeesController',
                controllerAs: 'FeesCtrl'
            },
            'header': {
                templateUrl: 'views/header-template.html',
                controller: 'HeaderController',
                controllerAs: 'HeaderCtrl'
            },
            'footer': {
                templateUrl: 'views/footer-template.html'
            }
        }
    })
    .state('home.transport', {
        url: 'transport',
        views: {
            'content': {
                templateUrl: 'views/transport-template.html',
                controller: 'TransportController',
                controllerAs: 'TransportCtrl'
            },
            'header': {
                templateUrl: 'views/header-template.html',
                controller: 'HeaderController',
                controllerAs: 'HeaderCtrl'
            },
            'footer': {
                templateUrl: 'views/footer-template.html'
            }
        }
    })
    .state('home.busservice', {
        url: 'busservice',
        views: {
            'content': {
                templateUrl: 'views/busservice-template.html',
                controller: 'BusserviceController',
                controllerAs: 'BusserviceCtrl'
            },
            'header': {
                templateUrl: 'views/header-template.html',
                controller: 'HeaderController',
                controllerAs: 'HeaderCtrl'
            },
            'footer': {
                templateUrl: 'views/footer-template.html'
            }
        }
    })
    .state('home.addRoutes', {
        url: 'busservice/routes',
        views: {
            'content': {
                templateUrl: 'views/addroutes-template.html',
                controller: 'BusserviceController',
                controllerAs: 'BusserviceCtrl'
            },
            'header': {
                templateUrl: 'views/header-template.html',
                controller: 'HeaderController',
                controllerAs: 'HeaderCtrl'
            },
            'footer': {
                templateUrl: 'views/footer-template.html'
            }
        }
    })
     .state('home.bussubscription', {
        url: 'bussubscription',
        views: {
            'content': {
                templateUrl: 'views/bussubscription-template.html',
                controller: 'BussubscriptionController',
                controllerAs: 'BussubscriptionCtrl'
            },
            'header': {
                templateUrl: 'views/header-template.html',
                controller: 'HeaderController',
                controllerAs: 'HeaderCtrl'
            },
            'footer': {
                templateUrl: 'views/footer-template.html'
            }
        }
    })
    .state('home.assignments', {
        url: 'assignments',
        views: {
            'content': {
                templateUrl: 'views/assignments-template.html',
                controller: 'AssignmentsController',
                controllerAs: 'AssignmentsCtrl'
            },
            'header': {
                templateUrl: 'views/header-template.html',
                controller: 'HeaderController',
                controllerAs: 'HeaderCtrl'
            },
            'footer': {
                templateUrl: 'views/footer-template.html'
            }
        }
    })
    .state('home.exams', {
        url: 'exams',
        views: {
            'content': {
                templateUrl: 'views/examlist-template.html',
                controller: 'ExamlistController',
                controllerAs: 'ExamlistCtrl'
            },
            'header': {
                templateUrl: 'views/header-template.html',
                controller: 'HeaderController',
                controllerAs: 'HeaderCtrl'
            },
            'footer': {
                templateUrl: 'views/footer-template.html'
            }
        }
    })
    .state('home.grade', {
        url: 'grades',
        views: {
            'content': {
                templateUrl: 'views/grade-template.html',
                controller: 'GradeController',
                controllerAs: 'GradeCtrl'
            },
            'header': {
                templateUrl: 'views/header-template.html',
                controller: 'HeaderController',
                controllerAs: 'HeaderCtrl'
            },
            'footer': {
                templateUrl: 'views/footer-template.html'
            }
        }
    })
    .state('home.library', {
        url: 'library',
        views: {
            'content': {
                templateUrl: 'views/library-template.html',
                controller: 'LibraryController',
                controllerAs: 'LibraryCtrl'
            },
            'header': {
                templateUrl: 'views/header-template.html',
                controller: 'HeaderController',
                controllerAs: 'HeaderCtrl'
            },
            'footer': {
                templateUrl: 'views/footer-template.html'
            }
        }
    })
    .state('home.noticeboard', {
        url: 'noticeboard',
        views: {
            'content': {
                templateUrl: 'views/noticeboard-template.html',
                controller: 'NoticeboardController',
                controllerAs: 'NoticeboardCtrl'
            },
            'header': {
                templateUrl: 'views/header-template.html',
                controller: 'HeaderController',
                controllerAs: 'HeaderCtrl'
            },
            'footer': {
                templateUrl: 'views/footer-template.html'
            }
        }
    })
    .state('home.schooltimetable', {
        url: 'schoool/timetable',
        views: {
            'content': {
                templateUrl: 'views/schooltimetable-template.html',
                controller: 'SchooltimetableController',
                controllerAs: 'SchooltimetableCtrl'
            },
            'header': {
                templateUrl: 'views/header-template.html',
                controller: 'HeaderController',
                controllerAs: 'HeaderCtrl'
            },
            'footer': {
                templateUrl: 'views/footer-template.html'
            }
        }
    })
    .state('home.bulkupload', {
        url: 'settings/bulkupload',
        views: {
            'content': {
                templateUrl: 'views/bulkupload-template.html',
                controller: 'BulkuploadController',
                controllerAs: 'BulkuploadCtrl'
            },
            'header': {
                templateUrl: 'views/header-template.html',
                controller: 'HeaderController',
                controllerAs: 'HeaderCtrl'
            },
            'footer': {
                templateUrl: 'views/footer-template.html'
            }
        }
    })
    .state('home.timetable', {
        url: 'collaborate/timetable',
        views: {
            'content': {
                templateUrl: 'views/classtimetable-template.html',
                controller: 'ClasstimetableController',
                controllerAs: 'ClasstimetableCtrl'
            },
            'header': {
                templateUrl: 'views/header-template.html',
                controller: 'HeaderController',
                controllerAs: 'HeaderCtrl'
            },
            'footer': {
                templateUrl: 'views/footer-template.html'
            }
        }
    })
    .state('home.schooldirectory', {
        url: 'communicate/directory',
        views: {
            'content': {
                templateUrl: 'views/schooldirectory-template.html',
                controller: 'SchooldirectoryController',
                controllerAs: 'SchooldirectoryCtrl'
            },
            'header': {
                templateUrl: 'views/header-template.html',
                controller: 'HeaderController',
                controllerAs: 'HeaderCtrl'
            },
            'footer': {
                templateUrl: 'views/footer-template.html'
            }
        }
    })
    .state('home.addStudent', {
        url: 'directory/addStudent',
        views: {
            'content': {
                templateUrl: 'views/addstudent-template.html',
                controller: 'AddstudentController',
                controllerAs: 'AddstudentCtrl'
            },
            'header': {
                templateUrl: 'views/header-template.html',
                controller: 'HeaderController',
                controllerAs: 'HeaderCtrl'
            },
            'footer': {
                templateUrl: 'views/footer-template.html'
            }
        }
    })
    .state('home.addStaff', {
        url: 'directory/addStaff',
        views: {
            'content': {
                templateUrl: 'views/addstaff-template.html',
                controller: 'AddstaffController',
                controllerAs: 'AddstaffCtrl'
            },
            'header': {
                templateUrl: 'views/header-template.html',
                controller: 'HeaderController',
                controllerAs: 'HeaderCtrl'
            },
            'footer': {
                templateUrl: 'views/footer-template.html'
            }
        }
    })
    .state('home.messages', {
        url: 'communicate/messages',
        views: {
            'content': {
                templateUrl: 'views/messages-template.html',
                controller: 'MessagesController',
                controllerAs: 'MessagesCtrl'
            },
            'header': {
                templateUrl: 'views/header-template.html',
                controller: 'HeaderController',
                controllerAs: 'HeaderCtrl'
            },
            'footer': {
                templateUrl: 'views/footer-template.html'
            }
        }
    })
    .state('home.marks', {
        url: 'compete/marks',
        views: {
            'content': {
                templateUrl: 'views/marks-template.html',
                controller: 'MarksController',
                controllerAs: 'MarksCtrl'
            },
            'header': {
                templateUrl: 'views/header-template.html',
                controller: 'HeaderController',
                controllerAs: 'HeaderCtrl'
            },
            'footer': {
                templateUrl: 'views/footer-template.html'
            }
        }
    })
    .state('home.profile', {
        url: 'myprofile',
        views: {
            'content': {
                templateUrl: 'views/profile-template.html',
                controller: 'ProfileController',
                controllerAs: 'ProfileCtrl'
            },
            'header': {
                templateUrl: 'views/header-template.html',
                controller: 'HeaderController',
                controllerAs: 'HeaderCtrl'
            },
            'footer': {
                templateUrl: 'views/footer-template.html'
            }
        }
    })
    .state('home.workingdays', {
        url: 'settings/workingdays',
        views: {
            'content': {
                templateUrl: 'views/workingdays-template.html',
                controller: 'WorkingdaysController',
                controllerAs: 'WorkingDays'
            },
            'header': {
                templateUrl: 'views/header-template.html',
                controller: 'HeaderController',
                controllerAs: 'HeaderCtrl'
            },
            'footer': {
                templateUrl: 'views/footer-template.html'
            }
        }
    })
    .state('home.schoolcalendar', {
        url: 'settings/schoolcalendar',
        views: {
            'content': {
                templateUrl: 'views/schoolcalendar-template.html',
                controller: 'SchoolcalendarController',
                controllerAs: 'SchoolCalendarCtrl'
            },
            'header': {
                templateUrl: 'views/header-template.html',
                controller: 'HeaderController',
                controllerAs: 'HeaderCtrl'
            },
            'footer': {
                templateUrl: 'views/footer-template.html'
            }
        }
    })
    .state('home.bulkremovals', {
        url: 'settings/bulkremovals',
        views: {
            'content': {
                templateUrl: 'views/bulkremovals-template.html',
                controller: 'BulkremovalsController',
                controllerAs: 'BulkRemovalsCtrl'
            },
            'header': {
                templateUrl: 'views/header-template.html',
                controller: 'HeaderController',
                controllerAs: 'HeaderCtrl'
            },
            'footer': {
                templateUrl: 'views/footer-template.html'
            }
        }
    })
    .state('home.mediauploads', {
        url: 'settings/mediauploads',
        views: {
            'content': {
                templateUrl: 'views/mediauploads-template.html',
                controller: 'MediauploadsController',
                controllerAs: 'MediaUploadCtrl'
            },
            'header': {
                templateUrl: 'views/header-template.html',
                controller: 'HeaderController',
                controllerAs: 'HeaderCtrl'
            },
            'footer': {
                templateUrl: 'views/footer-template.html'
            }
        }
    })
    .state('home.classupgrade', {
        url: 'settings/classupgrade',
        views: {
            'content': {
                templateUrl: 'views/classupgrade-template.html',
                controller: 'ClassupgradeController',
                controllerAs: 'ClassUpgradeCtrl'
            },
            'header': {
                templateUrl: 'views/header-template.html',
                controller: 'HeaderController',
                controllerAs: 'HeaderCtrl'
            },
            'footer': {
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
    $rootScope.$on('$stateChangeStart', function (event, nextState) {
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
