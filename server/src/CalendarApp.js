const express = require("express");
const bodyParser = require("body-parser");
const EventFetcher = require("./schedules/EventFetcher");
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
  res.json(app.locals.config);
});

app.get("/station/:station/year/:year/week/:weekOfYear", (req, res) => {
  const stationKey = req.params.station;
  const year = req.params.year;
  const week = req.params.weekOfYear;

  const fetcher = new EventFetcher(app.locals.config);
  const eventPromise = fetcher.getWeek(stationKey, year, week);
  eventPromise.then(events => {
    //console.log(`eventPromise(${events})`);
    res.json(events);
  });
});

module.exports = app;
