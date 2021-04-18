const questionModel = require('../models/questionModel.js');
const settingModel = require('../models/settingModel.js');

module.exports = (client) => {
    return new Promise(async function (resolve, reject) {
      try {
        const question = await questionModel.getOldestUnfinishedQuestion();
        const settings = await settingModel.getAll();
        const now = new Date(Date.now()).toLocaleString();

        if ((Date.now() / 1000) - question.addDate  > 3600 && settings.costPerAnswer < 11) {
          await settingModel.inc('costPerAnswer',1);
          console.log(now + ' Update costPerAnswer - Increased to ' + (settings.costPerAnswer*1+1));
        } else if ((Date.now() / 1000) - question.addDate  < 600 && settings.costPerAnswer > 10) {
          await settingModel.inc('costPerAnswer',-1);
          console.log(now + ' Update costPerAnswer - Decreased to ' + (settings.costPerAnswer*1-1));
        } else
          console.log(now + ' Update costPerAnswer - No change (' + settings.costPerAnswer + ').');

        resolve();
      } catch (e) { reject(e); }
    });
}
