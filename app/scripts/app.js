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
 'ui.router'
])
.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('home', {
        url: '/',
        templateUrl: 'views/main.html',
        conroller: 'MainCtrl',
        controllerAs: 'main'
    })
    .state('about', {
        url: '/about',
        controller: 'AboutCtrl',
        controllerAs: 'about',
        templateUrl: 'views/about.html'
    })
    .state('login', {
        url: '/login',
        controller: 'LoginController',
        controllerAs: 'LoginCtrl',
        templateUrl: 'views/login.html'
    })
    .state('console', {
        url: '/dashboard',
        templateUrl: 'views/console.html',
        controller: 'ConsoleController',
        controllerAs: 'ConsoleCtrl'
    })
    $urlRouterProvider.otherwise('/login');
}).run(function ($rootScope, $state, $cookies) {
    //Capture an event whenever the route changes
    $rootScope.$on('$stateChangeStart', function (event, nextState, nextParams, currentState, currentParams, options) {
        /*
        * If user Logged in and try to reload or change route then user should be successfully navigates
        * Not logged in but trying to navigate page directly then user should be sent to login screen
        */
        //First condition to check whether user logged in or not
        var uds = $cookies.getObject('uds');
        if (uds === undefined && nextState.name !== 'login') {
            event.preventDefault();
            $state.go('login');
        }
    });
}).constant('API_SERVER', 'http://meanstage.cloudapp.net:3000/api'); //Mean Stage
