const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.get('/', function(req, res) {
  res.json("Server running");
});



module.exports = app;
