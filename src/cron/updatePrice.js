const questionModel = require('../models/questionModel.js');
const settingModel = require('../models/settingModel.js');

module.exports = (client) => {
    return new Promise(async function (resolve, reject) {
      try {
        const question = await questionModel.getOldestUnfinishedQuestion();
        if (!question) {
          console.log('No unfinished questions. Update costPerAnswer.');
          return resolve();
        }

        const questionDateString = (new Date(question.addDate * 1000)).toLocaleString();
        console.log('Oldest unfinished Question: ' + question.id + ' ' + questionDateString + '. Update costPerAnswer.');


        const settings = await settingModel.getAll();
        const nowString = new Date(Date.now()).toLocaleString();

        if ((Date.now() / 1000) - question.addDate  > 3600 && settings.costPerAnswer < 11) {
          await settingModel.inc('costPerAnswer',1);
          console.log(nowString + ' Increased to ' + (settings.costPerAnswer*1+1));
        } else if ((Date.now() / 1000) - question.addDate  < 600 && settings.costPerAnswer > 10) {
          await settingModel.inc('costPerAnswer',-1);
          console.log(nowString + ' Decreased to ' + (settings.costPerAnswer*1-1));
        } else
          console.log(nowString + ' No change (' + settings.costPerAnswer + ').');

        resolve();
      } catch (e) { reject(e); }
    });
}
