//const fs = require("fs");
const fetch = require("node-fetch");
const util = require('util');
const app = require('../CalendarApp');

//schedule cache
storeSchedule(cacheLocation, station, year, weekOfYear, data) {

};

loadSchedule(cacheLocation, station, year, weakOfYear) {

};

class ScheduleParser {
  fetchSchedule(url) {
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
