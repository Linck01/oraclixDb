const cron = require('node-cron');
const fct = require('../util/fct.js');
const updatePrice = require('../util/updatePrice.js');


let updatePriceInterval,restartDelay;

if (process.env.NODE_ENV == 'production') {
  restartDelay = 86400000 * 7;
  updatePriceInterval = 300 * 1000;
} else {
  restartDelay = 86400000 * 7;
  updatePriceInterval = 15 * 1000;
}

exports.start = () => {
  return new Promise(async function (resolve, reject) {
    try {
      //startStatFlush(manager);
      startUpdatePrice();

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

const startUpdatePrice = async (manager) => {
  while(true) {
    try {
      await updatePrice();
    } catch (e) { console.log(e); }

    await fct.sleep(updatePriceInterval).catch(e => console.log(e));
  }
}
