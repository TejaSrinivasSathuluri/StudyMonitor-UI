'use strict';

/**
 * @ngdoc function
 * @name studymonitorApp.controller:SchooltimetableControllerCtrl
 * @description
 * # SchooltimetableControllerCtrl
 * Controller of the studymonitorApp
 */
angular.module('studymonitorApp')
  .controller('SchooltimetableController', function (schooltimetableService, $cookies, $scope, uiCalendarConfig, $timeout, $compile) {
      var SchooltimetableCtrl = this;

      //Defaults
      SchooltimetableCtrl.calendarEvent = [];
      SchooltimetableCtrl.formFields = {};
      $timeout(function () {
          $('#starttimepicker').datetimepicker({
              format: 'HH:mm'
          });
          $('#endtimepicker').datetimepicker({
              format: 'HH:mm'
          });
          //Initialize metronic
          Metronic.init();
      });

      SchooltimetableCtrl.schoolId = $cookies.getObject('uds').schoolId;
      /*
       * Controller initialize
       */
      function init() {
          this.getTimetable = function () {
              schooltimetableService.getSchoolTimetableById(SchooltimetableCtrl.schoolId).then(function (result) {
                  if (result) {
                      SchooltimetableCtrl.timetableList = result;

                      angular.forEach(SchooltimetableCtrl.timetableList, function (v, i) {
                          SchooltimetableCtrl.timetableList[i].startTime = new Date(v.startTime);
                          SchooltimetableCtrl.timetableList[i].endTime = new Date(v.endTime);
                      });

                      //Change the calendar config for start and end timings of the school
                      var totalRecords = SchooltimetableCtrl.timetableList.length;
                      SchooltimetableCtrl.calendarConfig.calendar.minTime = moment(SchooltimetableCtrl.timetableList[0].startTime).format('HH:mm:ss');
                      SchooltimetableCtrl.calendarConfig.calendar.maxTime = moment(SchooltimetableCtrl.timetableList[totalRecords - 1].endTime).format('HH:mm:ss');

                      addEvents();
                  }
              });
          }
      }
      (new init()).getTimetable();

      //Event click
      SchooltimetableCtrl.calendarEventClick = function (date, jsEvent, view) {
          console.log(date);
      }
      //Render a calendar
      SchooltimetableCtrl.calendarRenderEvent = function (event, element, view) {
          var template = '<a class="btn btn-circle btn-icon-only red delete" href="javascript:void(0);"><i class="icon-trash"></i></a>';
          element.append(template);
          element.find('.delete').bind('click', function (e) {
              SchooltimetableCtrl.deleteCalendarEvent(event);
              return false;
          });
          $compile(element)($scope);
      }
      //Calendar Configurations
      SchooltimetableCtrl.calendarConfig = {
          calendar: {
              height: 500,
              editable: false,
              defaultView: 'agendaDay',
              minTime: '6:00:00',
              maxTime: '22:00:00',
              eventClick: SchooltimetableCtrl.calendarEventClick,
              //eventRender: SchooltimetableCtrl.calendarRenderEvent
          }
      }
      //Add List of events to a calendar
      var addEvents = function () {
          //timetableSources
          if (SchooltimetableCtrl.timetableList && SchooltimetableCtrl.timetableList.length > 0) {
              var todayDate = new Date();
              angular.forEach(SchooltimetableCtrl.timetableList, function (v, i) {
                  SchooltimetableCtrl.calendarEvent.push({
                      "title": v.title + ' - ' + v.duration + ' Minutes',
                      "start": new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate(), v.startTime.getHours(), v.startTime.getMinutes()),
                      "end": new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate(), v.endTime.getHours(), v.endTime.getMinutes()),
                      "allDay": false,
                      "color": getColorCode(v.duration, v.title)
                  });
              });
          }
      }
      //Get the different color code depends on the type of title or duration
      //As of Now - Duration less than 20 and title contains lunch
      var getColorCode = function (duration, title) {

          if ((parseInt(duration) <= 20) || (title.toLowerCase().indexOf('lunch') > -1)) {
              return "#EC7063";
          }
          return "#26a69a";
      }
      //Binding the events to Calendar Model
      SchooltimetableCtrl.eventSources = [SchooltimetableCtrl.calendarEvent];
  });
