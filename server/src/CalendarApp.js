const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.get('/', function(req, res) {
  res.json(app.locals.config);
});

app.get("/station/:station/year/:year/week/:weekOfYear", function(req, res) {
  const availableStations = app.locals.config.stations;

  res.json("getting rest values");
})

module.exports = app;
