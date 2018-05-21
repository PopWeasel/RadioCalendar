//const fs = require("fs");
const fetch = require("node-fetch");
const util = require('util');
const app = require('../CalendarApp');
const fs = require('fs-extra');
const path = require('path');

class ScheduleParser {
  constructor(cacheDir) {
    console.log(`ScheduleParser(${cacheDir})`);
    this.cache = new ScheduleCache(cacheDir);
  }

  async getWeek(station, year, week) {
    console.log(`getWeek(${station}, ${year}, ${week})`);
    let url = station.week;
    url = url.replace(/YEAR/, year);
    url = url.replace(/WEEK_OF_YEAR/, week);

    let data = await this.cache.getCached(station, year, week);
    if (data == null) {
      data = await this._fetchSchedule(url);
      if (data) {
        await this.cache.setCache(data, station, year, week);
      } else {
        throw("Failed to fetch any data");
      }
    }

    const events = await ScheduleParser._parseBody(data);
    return events;
  }

  async _fetchSchedule(url) {
    console.log(`_fetchSchedule(${url}`);
    const response = await fetch(url);
    if (response.status == 200) {
      const text = await response.text();
      return text;
    } else {
      throw(`URL fetch status: ${response.status} url: ${url}`);
    }
  }

  static _parseBody(body) {
    const events = ['parsed', 'eventlist'];
    return events;
  }
}

class ScheduleCache {
  constructor(cacheDir) {
    console.log(`ScheduleCache(${cacheDir}`);
    this.cacheDir = cacheDir;
  }

  async getCached(station, year, week) {
    console.log(`getCached(${station}, ${year}, ${week})`);
    const filename = this._getCacheFilename(station, year, week);
    if (await fs.pathExists(filename)) {
      const body = await fs.readFile(filename);
      return body;
    }
  }

  async setCache(data, station, year, week) {
    console.log(`setCache(${station}, ${year}, ${week})`);
    const filename = this._getCacheFilename(station, year, week);
    await fs.outputFile(filename, data);
  }

  _getCacheFilename(station, week, year) {
    let cachePath = path.join(this.cacheDir, `${station.key}_${year}_${week}.html`);
    cachePath = path.resolve(cachePath);
    console.log(`_getCacheFilename() => ${cachePath}`);
    return cachePath;
  }
}
module.exports = ScheduleParser;
