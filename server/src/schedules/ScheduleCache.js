const path = require('path');
const fs = require('fs-extra');

class ScheduleParser {
  static isWeekCached(config, station, week, year) {
    const cachePath = ScheduleParser._getCacheFilename(config, station, week ,year);
    return fs.pathExists(cachePath)
      .then(exists => {return exists});
  }

  static setWeek(config, station, week, year, data) {
    const cachePath = ScheduleParser._getCacheFilename(config, station, week ,year);
    fs.outputJson(cachePath, data)
      .then(() => {return})
      .catch(err => {
        console.error(err)
      });
  };

  static getWeek(config, station, week, year) {
    const cachePath = ScheduleParser._getCacheFilename(config, station, week ,year);

    const events = [];
    return events;
  };

  static _getCacheFilename(config, station, week, year) {
    const baseDir = config.server.cacheLocation;
    let cachePath = path.join(baseDir, year, week, `{station.key}.json`);
    cachePath = path.resolve(cachePath);
    return cachePath;
  }
}

module.exports = ScheduleParser
