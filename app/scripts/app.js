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
 .config(function ($stateProvider,$urlRouterProvider) {
  $stateProvider
  .state('home',{
    url:'/',
    templateUrl:'views/main.html',
    conroller:'MainCtrl',
    controllerAs:'main'
  })
  .state('about',{
    url:'/about',
    controller:'AboutCtrl',
    controllerAs:'about',
    templateUrl:'views/about.html'
  })
  .state('login',{
    url:'/login',
    templateUrl:'views/login.html'
  })

  $urlRouterProvider.otherwise('/login');
});
