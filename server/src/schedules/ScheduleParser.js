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

    let timetable = await this.cache.getCached(station, year, week);
    if (timetable == null) {
      const data = await this._fetchSchedule(url);
      timetable = await this._parseBody(data, year);
      await this.cache.setCache(timetable, station, year, week);
    }

    return timetable;
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
        events: []
      }
      const dom = new JSDOM(html);
      for (let dayNum of Array.from(Array(7).keys())) {
        timetable.events[dayNum] = [];
        const elements = dom.window.document.querySelectorAll(`.day-${dayNum}`);
        for (let element of elements) {
          //console.log(`Day ${dayNum} => ${element.nodeName}`);
          if (element.nodeName === "TH") {
            const day = element.querySelector('.date-list__item-line1').innerHTML;
            const dayMonth = element.querySelector('.date-list__item-line2').innerHTML;
            try {
              //console.log(`Processing date ${dayMonth} ${year}`);
              const date = moment(`${dayMonth} ${year}`, "D MMMM YYYY");
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
              let subTitle;
              if (subTitleSpan != null) {
                subTitle = subTitleSpan.querySelector('span').textContent;
              }
              const eventURL = entryDetails.querySelector("a").href;
              const pid = eventURL.split("/").pop();

              const synopsisElement = entry.querySelector(".programme__synopsis");
              let synopsis, episode, total;
              if (synopsisElement != null) {
                synopsis = synopsisElement.querySelector("span:not([datatype]):not(.programme__groupsize) ").textContent;
                const episodeElement = synopsisElement.querySelector("abbr");
                if (episodeElement != null) {
                  const numElement = episodeElement.querySelector("span[datatype]");
                  if (numElement != null) {
                    episode = numElement.textContent;
                  }
                  const totalElement = episodeElement.querySelector(".programme__groupsize");
                  if (totalElement != null) {
                    total = totalElement.textContent;
                  }
                  //console.log(`${mainTitle} => ${total} ${episode}`);

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
              timetable.events[dayNum].push(event);
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
      const data = await fs.readFile(filename);
      const timetable = JSON.parse(data);
      return timetable;
    }
  }

  async setCache(timetable, station, year, week) {
    //console.log(`setCache(${station}, ${year}, ${week})`);
    const filename = this._getCacheFilename(station, year, week);
    const data = await JSON.stringify(timetable, null, 2);
    await fs.outputFile(filename, data);
  }

  _getCacheFilename(station, week, year) {
    let cachePath = path.join(this.cacheDir, `${station.key}_${year}_${week}.json`);
    cachePath = path.resolve(cachePath);
    console.log(`_getCacheFilename() => ${cachePath}`);
    return cachePath;
  }
}
module.exports = ScheduleParser;
