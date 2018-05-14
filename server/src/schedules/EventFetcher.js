const moment = require('moment');

const ScheduleParser = require('./ScheduleParser');
const ScheduleCache = require('./ScheduleCache');

class EventFetcher {
  static getWeek(stationKey, year, week) {
    console.log(app);
    const availableStations = app.locals.config.stations
    const selectedStations = availableStations.filter(element => {return element.key == stationKey});
    const selectedStation = selectedStations[0];

    let url = selectedStation.week;
    url = url.replace(/YEAR/, year);
    url = url.replace(/WEEK_OF_YEAR/, week);

    const date = moment().day("Monday").year(year).week(week).toDate();
    console.log(date);
  }
}

module.exports = EventFetcher;
