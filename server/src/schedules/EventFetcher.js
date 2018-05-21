const moment = require('moment');
const ScheduleParser = require('./ScheduleParser');

class EventFetcher {
  constructor(config) {
    console.log(`EventFetcher(${config})`);
    this.config = config;
  }

  async getWeek(stationKey, year, week) {
    const availableStations = this.config.stations
    const selectedStations = availableStations.filter(element => {return element.key == stationKey});
    const selectedStation = selectedStations[0];
    try {
      const parser = new ScheduleParser(this.config.server.cacheLocation)
      const events = parser.getWeek(selectedStation, year, week);
      return events;
    } catch(err) {
      console.error(err);
    }
  }
}

module.exports = EventFetcher;
