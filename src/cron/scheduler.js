const cron = require('node-cron');
const fct = require('../util/fct.js');

let aAAInterval,aAAACronInterval,restartDelay;

if (process.env.NODE_ENV == 'production') {
  restartDelay = 86400000 * 7;
  priceChangeInterval = 10000;
} else {
  restartDelay = 86400000 * 7;
  priceChangeInterval = 10000;
}

exports.start = () => {
  return new Promise(async function (resolve, reject) {
    try {
      //startStatFlush(manager);
      startPriceChange();

      // Periodical Restart
      setTimeout(function() {
        try {
          process.exit();
        } catch (e) { console.log(e); }
      }, restartDelay);

      resolve();
    } catch (e) { reject(e); }
  });
}

const startPriceChange = async (manager) => {
  while(true) {
    try {
      

    } catch (e) { console.log(e); }

    await fct.sleep(priceChangeInterval).catch(e => console.log(e));
  }
}
