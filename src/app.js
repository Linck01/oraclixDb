const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes.js');
const fct = require('./util/fct.js');
const cron = require('node-cron');
const scheduler = require('./cron/scheduler.js');
const db = require('./models/db.js');
process.env.PORT = 3008;

// Set Routes
app.use(routes);

const server = app.listen(process.env.PORT, async () => {
  try {
    await scheduler.start();
    //await db.query('SELECT * FROM');
    console.log(`Listening on port ${process.env.PORT}...`);
  } catch (e) {
    console.log(e);
    await fct.waitAndReboot(3000);
  }
});
