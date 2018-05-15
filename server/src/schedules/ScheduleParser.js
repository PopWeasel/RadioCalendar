//const fs = require("fs");
const fetch = require("node-fetch");
const util = require('util');
const app = require('../CalendarApp');

class ScheduleParser {

  getWeek(config, station, year, week) {
    let url = station.week;
    url = url.replace(/YEAR/, year);
    url = url.replace(/WEEK_OF_YEAR/, week);

  }

  _fetchSchedule(url) {
    const prom = fetch(url)
      .then(function(response){return response.text()})
      .then(function(value) {
        const data =  {
            "events": [url],
            "response": value
      }
      response.json(data);
    });
  }
}

module.exports = ScheduleParser;
