//const fs = require("fs");
const fetch = require("node-fetch");
const util = require('util');
const app = require('../CalendarApp');
const fs = require('fs-extra');
const path = require('path');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const moment = require('moment');

class ScheduleParser {
  constructor(cacheDir) {
    //console.log(`ScheduleParser(${cacheDir})`);
    this.cache = new ScheduleCache(cacheDir);
  }

  async getWeek(station, year, week) {
    //console.log(`getWeek(${station}, ${year}, ${week})`);
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

    const events = this._parseBody(data, year);
    return events;
  }

  async _fetchSchedule(url) {
    //console.log(`_fetchSchedule(${url}`);
    const response = await fetch(url);
    if (response.status == 200) {
      const text = await response.text();
      return text;
    } else {
      throw(`URL fetch status: ${response.status} url: ${url}`);
    }
  }

  async _parseBody(html, year) {
    return new Promise((resolve, reject) => {
      console.log(`_parseBody()`);
      const timetable = {
        days: [],
        events: {}
      }
      const dom = new JSDOM(html);
      for (let dayNum of Array.from(Array(7).keys())) {
        const elements = dom.window.document.querySelectorAll(`.day-${dayNum}`);
        for (let element of elements) {
          //console.log(`Day ${dayNum} => ${element.nodeName}`);
          if (element.nodeName === "TH") {
            const day = element.querySelector('.date-list__item-line1').innerHTML;
            const dayMonth = element.querySelector('.date-list__item-line2').innerHTML;
            try {
              const date = moment(`${dayMonth} ${year}`, "D MMMM YY");
              timetable.days[dayNum] = date;
              timetable.events.dayNum = [];
            } catch(err) {
              console.log(`ERROR ${err}: ${dayNum} => ${dayMonth}`);
              raise(err);
            }
          } else if (element.nodeName === "TD") {
            const entries = element.querySelectorAll(".week-guide__table__item");
            for (let entry of entries) {
              const entryTimeElement = entry.querySelector(".broadcast__info");
              const start = entryTimeElement.querySelector(".broadcast__time").getAttribute("content");
              const end = entryTimeElement.querySelector("meta").getAttribute("content")

              const entryDetails = entry.querySelector(".programme__titles");

              const mainTitleSpan = entryDetails.querySelector(".programme__title");
              const mainTitle = mainTitleSpan.querySelector('span').textContent;

              const subTitleSpan = entryDetails.querySelector(".programme__subtitle");
              let subTitle = "";
              if (subTitleSpan != null) {
                subTitle = subTitleSpan.querySelector('span').textContent;
              }
              const eventURL = entryDetails.querySelector("a").href;
              const pid = eventURL.split("/").pop();

              const synopsisElement = entry.querySelector(".programme__synopsis");
              let synopsis, episode, total;
              if (synopsisElement != null) {
                synopsis = synopsisElement.querySelector("span").textContent;
                const episodeElement = synopsisElement.querySelector("abbr");
                if (episodeElement != null) {
                  const numElement = episodeElement.querySelector("span");
                  if (numElement != null) {
                    episode = numElement.textContent;
                  }
                  const totalElement = episodeElement.querySelector(".programme__groupsize");
                  if (totalElement != null) {
                    total = totalElement.textContent;
                  }
                  console.log(`${mainTitle} => ${total} ${episode}`);

                }
              }
              const event = {
                start: moment(start),
                end: moment(end),
                title: mainTitle,
                subTitle: subTitle,
                url: eventURL,
                pid: pid,
                episode: episode,
                total: total,
                synopsis: synopsis
              };
              timetable.events.dayNum.push(event);
            }

          }
        }
      }
      if (timetable != null) {
        resolve(timetable);
      } else {
        reject("No events in body");
      }

    });
  }
}

class ScheduleCache {
  constructor(cacheDir) {
    //console.log(`ScheduleCache(${cacheDir}`);
    this.cacheDir = cacheDir;
  }

  async getCached(station, year, week) {
    //console.log(`getCached(${station}, ${year}, ${week})`);
    const filename = this._getCacheFilename(station, year, week);
    if (await fs.pathExists(filename)) {
      const body = await fs.readFile(filename);
      return body;
    }
  }

  async setCache(data, station, year, week) {
    //console.log(`setCache(${station}, ${year}, ${week})`);
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
