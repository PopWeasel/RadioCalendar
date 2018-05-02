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
  const selectedStation = req.params.station;
  const year = req.params.year;
  const week = req.params.weekOfYear;
  console.log(`${selectedStation} => ${year}:${week}`);
  const data =  {
      "events": [1,2,3,4,5,6,7,8]
  }

  res.json(data);
})

module.exports = app;
