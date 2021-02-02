const cron = require('node-cron');
const fct = require('../util/fct.js');

let aAAInterval,aAAACronInterval,restartDelay;

if (process.env.NODE_ENV == 'production') {
  restartDelay = 86400000 * 7;
  aAAInterval = 10000;
  aAAACronInterval = '30 * * * * *';
} else {
  restartDelay = 86400000 * 7;
  aAAInterval = 10000;
  aAAACronInterval = '*/10 * * * * *';
}

exports.start = () => {
  return new Promise(async function (resolve, reject) {
    try {
      //startStatFlush(manager);
      startAAA();

      // Periodical Restart
      setTimeout(function() {
        try {
          process.exit();
        } catch (e) { console.log(e); }
      }, restartDelay);

      cron.schedule(aAAACronInterval, async function() {
        try {

        } catch (e) { console.log(e); }
      });

      resolve();
    } catch (e) { reject(e); }
  });
}

const startAAA = async (manager) => {
  while(true) {
    try {

    } catch (e) { console.log(e); }

    await fct.sleep(aAAInterval).catch(e => console.log(e));
  }
}
