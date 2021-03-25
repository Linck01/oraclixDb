const fct = require('../util/fct.js');
const answerModel = require('../models/answerModel.js');
const questionModel = require('../models/questionModel.js');
const userModel = require('../models/userModel.js');
const config = require('../const/config.js');
const utilModel = require('../models/utilModel.js');

exports.create = async (req, res, next) => {
  try {
    if (!fct.checkDBApiAuth(req))
      return res.send(fct.apiResponseJson([],'Authorization failed.'));

        //const answer = answerModel.exists(user.id,)
    const user = await userModel.get(req.body.userId);

    if (fct.isBanned(user))
      return res.send(fct.apiResponseJson([],'User is still banned.'));

    if (await answerModel.existsAnswerFromUser(req.body.questionId,req.body.userId))
      return res.send(fct.apiResponseJson([],'User has already answered that question.'));

    await answerModel.create(req.body.questionId,req.body.userId,req.body.text);
    await questionModel.inc(req.body.userId,'currentAnswers',1);
    await userModel.inc(req.body.userId,'credits',(await utilModel.getSettings()).rewardPerAnswer);

    res.send(fct.apiResponseJson([],null));
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

/*
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
}*/
