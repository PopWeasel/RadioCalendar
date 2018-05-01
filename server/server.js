const app = require("./CalendarApp");
const argv = require('yargs').argv;

const port = argv.port || 3000;

const server = app.listen(port, function(){
  console.log("Express server listening on port " + port);
});
