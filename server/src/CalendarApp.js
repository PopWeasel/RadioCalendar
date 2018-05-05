const express = require("express");
const bodyParser = require("body-parser");
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
  const availableStations = app.locals.config.stations;
  const stationKey = req.params.station;
  const selectedStations = availableStations.filter(element => {return element.key == stationKey});
  const selectedStation = selectedStations[0];
  const year = req.params.year;
  const week = req.params.weekOfYear;
  let url = selectedStation.week;
  url = url.replace(/YEAR/, year);
  url = url.replace(/WEEK_OF_YEAR/, week);
  const data =  {
      "events": [url]
  }

  res.json(data);
})

module.exports = app;
