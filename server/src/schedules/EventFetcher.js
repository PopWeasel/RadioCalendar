const moment = require('moment');
const ScheduleParser = require('./ScheduleParser');
const ScheduleCache = require('./ScheduleCache');

class EventFetcher {
  static getWeek(config, stationKey, year, week) {
    const availableStations = config.stations
    const selectedStations = availableStations.filter(element => {return element.key == stationKey});
    const selectedStation = selectedStations[0];
    let events = selectedStation;
    if (ScheduleCache.isWeekCached(config, selectedStation, year, week)) {
      //events = ScheduleCache.getWeek(config, selectedStation, year, week);
    } else {
      //events = ScheduleParser.getWeek(config, selectedStation, year, week);
    }
    let url = selectedStation.week;
    url = url.replace(/YEAR/, year);
    url = url.replace(/WEEK_OF_YEAR/, week);

    const date = moment().day("Monday").year(year).week(week).toDate();
    console.log(date);
    return events;
  }
}

module.exports = EventFetcher;
