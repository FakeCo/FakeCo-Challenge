'use strict';

/**
 * @ngdoc function
 * @name challengeApp.controller:AboutCtrl
 * @description
 * Controller of the challengeApp
 */
angular.module('challengeApp')
	.service('ScheduleService', function($http) {
    var URL = 'http://fake-co-calendar.herokuapp.com/api/v1/events?callback=JSON_CALLBACK';
		function getSchedule() {
				var request = $http({
					method: 'JSONP',
					url: URL
				});
				return(request.then(handleSuccess, handleError));
		}

		function handleSuccess(response) {
      var listLength = response.data.events.list.length;
      //Convert string to date.
      for(var i=0; i<listLength; i++) {
        response.data.events.list[i].start_time = new Date(response.data.events.list[i].start_time);
        response.data.events.list[i].end_time = new Date(response.data.events.list[i].end_time);
      }
			return (response);
		}

		function handleError(error) {
			return (error);
		}

		return ({
			getSchedule: getSchedule
		});

	});
