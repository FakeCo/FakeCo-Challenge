'use strict';

/**
 * @ngdoc function
 * @name challengeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the challengeApp
 */
angular.module('challengeApp')
	.controller('MainCtrl', function($scope, $interval, ScheduleService) {
		var self = this;
		self.time = null;
		self.currentTime = function() {
			self.time = new Date();
		};

		ScheduleService.getSchedule().then(function(response) {
			this.scheduleData = response.data;

			$interval(function() {
				self.currentTime();
				self.setStatus();
			}, 1000);

		}.bind(this));

		self.setStatus = function() {
			var listLength = self.scheduleData.events.list.length;
			for (var i = 0; i < listLength; i++) {
				var now = Date.now();
				var timeToStart = ((now - self.scheduleData.events.list[i].start_time) / 1000) / 60 * -1;
				if (now > self.scheduleData.events.list[i].start_time && now < self.scheduleData.events.list[i].end_time) {
					self.scheduleData.events.list[i].status = 'current';
				} else if (timeToStart > 10 && now < self.scheduleData.events.list[i].start_time) {
					self.scheduleData.events.list[i].status = 'future';
				} else if (timeToStart < 10 && now < self.scheduleData.events.list[i].start_time) {
					self.scheduleData.events.list[i].status = 'futureSoon';
				} else if (now > self.scheduleData.events.list[i].end_time) {
					self.scheduleData.events.list[i].status = 'past';
				}
			}
		};



	});
