const questionModel = require('../models/questionModel.js');
const categoryModel = require('../models/categoryModel.js');
const config = require('../config.js');

module.exports = () => {
  return new Promise(async function (resolve, reject) {
    try {
      const categories = await categoryModel.getAll();
      const nowDate = new Date();

      let questions,nowTimestamp,temp;
      for (category of categories) {
        questions = await questionModel.getActiveQuestionIds(category.name,'');
        if (questions.length == 0) {
          if (category.priceperanswer > config.priceLimitBottom)
            await categoryModel.addPrice(category.name,-1);
          continue;
        }


        temp = new Date(questions[questions.length-1].dateadded);
        lastActiveQuestionTimestamp = new Date(temp.getTime() - temp.getTimezoneOffset() * 60000).getTime() / 1000;
        nowTimestamp = nowDate.getTime() / 1000;

        if (nowTimestamp > lastActiveQuestionTimestamp + config.priceBreakSeconds) {
          if (category.priceperanswer < config.priceLimitTop)
            await categoryModel.addPrice(category.name,1);
        } else {
          if (category.priceperanswer > config.priceLimitBottom)
            await categoryModel.addPrice(category.name,-1);
        }
      }

      console.log('Updated Price.');
      resolve();
    } catch (e) { return reject(e); }
  });
}
