//const fs = require("fs");
const fetch = require("node-fetch");
const util = require('util');
const app = require('../CalendarApp');

class ScheduleParser {

  static getWeek(station, week, year) {
    let url = station.week;
    url = url.replace(/YEAR/, year);
    url = url.replace(/WEEK_OF_YEAR/, week);
    const promise = ScheduleParser._fetchSchedule(url)
      .then(body => {
        const events = ScheduleParser._parseBody(body);
        return events;
      })
      .then(events => console.log(events));
    return promise;
  }


  static _fetchSchedule(url) {
    return fetch(url)
      .then(response => {
        if (response.status === 200) {
          return response.text();
        } else {
          throw(`URL fetch status: {$response.status} url: {$url}`);
        }
      })
      .catch(err => {
        console.error("Error: " + err);
      });
  }

  static _parseBody(body) {
    const events = ['parsed', 'eventlist'];
    return events;
  }

}
module.exports = ScheduleParser;
