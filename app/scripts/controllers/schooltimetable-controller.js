'use strict';

/**
 * @ngdoc function
 * @name studymonitorApp.controller:SchooltimetableControllerCtrl
 * @description
 * # SchooltimetableControllerCtrl
 * Controller of the studymonitorApp
 */
angular.module('studymonitorApp')
  .controller('SchooltimetableController', function () {
      var SchooltimetableCtrl = this;

      //Calendar Configurations
      SchooltimetableCtrl.calendarConfig = {
          calendar: {
              height: 500,
              editable: true,
              defaultView: 'agendaDay',
              minTime: '8:00:00',
              maxTime: '18:00:00'
          }
      }

  });
