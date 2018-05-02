const app = require("./CalendarApp");
const argv = require('yargs').argv;
const fs = require('fs');

const configFile = argv.config || "../config/app-config.js";
fs.readFile(configFile, function(err, data){
  if (err) {
    throw err;
  }

  const config = JSON.parse(data.toString());
  app.locals.config = config;
  const server = app.listen(config.server.port, function(){
    console.log("Express server listening on port " + config.server.port);
  });
});
