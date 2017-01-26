'use strict';

/**
 * @ngdoc service
 * @name studymonitorApp.appMessages
 * @description
 * # appMessages
 * Value in the studymonitorApp.
 */
angular.module('studymonitorApp')
  .value('APP_MESSAGES', {
      "LOGIN_INVALID": "Invalid email address or password",
      "LOGIN_SUCCESS": "Loged In successfully",
      "INSERT_SUCCESS": "Data saved successfully",
      "UPDATE_SUCCESS": "Data updated successfully",
      "SERVER_ERROR": " Server Error. Please reload",
      "DELETE_SUCCESS": "Record Deleted successfully",
      "DATA_EXISTS_DESC": "Provided information already exists",
      "DATA_EXISTS": "Data already exists"

  });
