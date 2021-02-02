const fct = require('../util/fct.js');
const answerModel = require('../models/answerModel.js');
const questionModel = require('../models/questionModel.js');
const userModel = require('../models/userModel.js');
const config = require('../const/config.js');

exports.new = async (req, res, next) => {
  try {
    if (!fct.checkDBApiAuth(req))
      return res.send(fct.apiResponseJson([],'Authorization failed.'));

    await answerModel.new(req.body.questionId,req.body.userId,req.body.text);
    await userModel.addCredits(req.body.userId,config.creditsPerAnswer);

    res.send(fct.apiResponseJson([],null));
    await tryFinalize(req.body.questionId);
  } catch (e) {
    console.log(e);
    res.send(fct.apiResponseJson([],'Could not add new Answer'));
  }
}


exports.getByQuestionId = async (req, res, next) => {
  try {
    const answers = await answerModel.getByQuestionId(req.params.questionId);

    res.send(fct.apiResponseJson(answers,null));
  } catch (e) {
    console.log(e);
    res.send(fct.apiResponseJson([],'Could not add new Answer'));
  }
}

exports.getByUserId = async (req, res, next) => {
  try {
    const answers = await answerModel.getByUserId(req.params.userId);

    res.send(fct.apiResponseJson(answers,null));
  } catch (e) {
    console.log(e);
    res.send(fct.apiResponseJson([],'Could not add new Answer'));
  }
}

function tryFinalize(questionId) {
  return new Promise(async function (resolve, reject) {
    try {
      const question = await questionModel.get(questionId);
      const answers = await answerModel.getByQuestionId(questionId);

      if (question.finished)
        return resolve();
      if (answers.length < question.maxanswers)
        return resolve();

      await questionModel.set(questionId,'finished',1);

      resolve();
    } catch (e) { return reject(e); }
  });
}
