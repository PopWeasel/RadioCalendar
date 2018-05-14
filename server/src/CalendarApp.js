const express = require("express");
const bodyParser = require("body-parser");
const EventFetcher = require("./schedules/EventFetcher");
const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res) {
  res.json(app.locals.config);
});

app.get("/station/:station/year/:year/week/:weekOfYear", function(req, res) {
  const stationKey = req.params.station;
  const year = req.params.year;
  const week = req.params.weekOfYear;

  EventFetcher.getWeek(stationKey, week, year);

  const data =  {
      "events": [url]
  }
  res.json(data);
});

module.exports = app;
