const questionModel = require('../models/questionModel.js');
const utilModel = require('../models/utilModel.js');
const fct = require('../util/fct.js');
const userModel = require('../models/userModel.js');
const answerModel = require('../models/answerModel.js');
const random = require('random');
const geometricDist = random.geometric(p = 0.15);

exports.create = async (req, res, next) => {
  try {
    if (!fct.checkDBApiAuth(req))
      return res.send(fct.apiResponseJson([],'Authorization failed.'));

    const user = await userModel.get(req.body.userId);
    const price = (await utilModel.getSettings()).pricePerAnswer * req.body.answerCount;

    if (user.credits < price)
      return res.send(fct.apiResponseJson([],'Not enough credits.'));

    if (fct.isBanned(user))
      return res.send(fct.apiResponseJson([],'User is still banned.'));

    await userModel.inc(req.body.userId,'credits',-price);
    const insertId = await questionModel.create(req.body.guildId,req.body.channelId,
        req.body.userId,req.body.question,req.body.answerCount);

    res.send(fct.apiResponseJson(insertId,null));
  } catch (e) {
    console.log(e);
    res.send(fct.apiResponseJson([],'Could not add new Question'));
  }
}

exports.set = async (req, res, next) => {
  try {
    if (!fct.checkDBApiAuth(req))
      return res.send(fct.apiResponseJson([],'Authorization failed.'));

    await questionModel.set(req.body.id,req.body.field,req.body.value);

    res.send(fct.apiResponseJson([],null));
  } catch (e) {
    console.log(e);
    res.send(fct.apiResponseJson([],'Could not update Question.'));
  }
}

exports.get = async (req, res, next) => {
  try {
    question = await questionModel.get(req.params.id);

    res.send(fct.apiResponseJson(question,null));
  } catch (e) {
    console.log(e);
    res.send(fct.apiResponseJson([],'Could not get Question'));
  }
}

exports.getQuestionToAnswer = async (req, res, next) => {
  try {
    const user = await userModel.get(req.params.userId);
    const question = await drawQuestion(req.params.userId)

    res.send(fct.apiResponseJson(question,null));
  } catch (e) {
    console.log(e);
    res.send(fct.apiResponseJson([],'Could not add new Question'));
  }
}

exports.getFinishedButNotSent = async (req, res, next) => {
  try {
    const questions = await questionModel.getFinishedButNotSent();

    res.send(fct.apiResponseJson(questions,null));
  } catch (e) {
    console.log(e);
    res.send(fct.apiResponseJson([],'Could not get Questions'));
  }
}

exports.getAll = async (req, res, next) => {
  try {
    const questions = await questionModel.getAll(req.params.page);

    res.send(fct.apiResponseJson(questions,null));
  } catch (e) {
    console.log(e);
    res.send(fct.apiResponseJson([],'Could not get Questions'));
  }
}

exports.getByUserId = async (req, res, next) => {
  try {
    const questions = await questionModel.getByUserId(req.params.userId);

    res.send(fct.apiResponseJson(questions,null));
  } catch (e) {
    console.log(e);
    res.send(fct.apiResponseJson([],'Could not get Questions'));
  }
}

function drawQuestion(userId) {
  return new Promise(async function (resolve, reject) {
    try {
      //const answeredQuestionIds = await answerModel.getAnsweredQuestionIdsByUserId(userId);
      let i = geometricDist() - 1,question;

      // Unfinished QUESTIONS
      const notDoneUnfinishedQuestionIds = await questionModel.getNotDoneUnfinishedQuestionIds(userId);
      //console.log(unfinishedQuestionIds);
      //const notDoneUnfinishedQuestionIds = unfinishedQuestionIds.diff(answeredQuestionIds);

      if (notDoneUnfinishedQuestionIds.length > 0) {
        while (i >= notDoneUnfinishedQuestionIds.length)
          i = geometricDist() - 1;

        question = await questionModel.get(notDoneUnfinishedQuestionIds[i]);

        return resolve(question);
      }

      // FINISHED QUESTIONS
      const finishedQuestionIds = await questionModel.getRandomFinishedQuestionIds(userId);
      const notDoneFinishedQuestionIds = finishedQuestionIds.diff(answeredQuestionIds);

      if (notDoneFinishedQuestionIds.length > 0) {

        while (i >= notDoneFinishedQuestionIds.length)
          i = geometricDist() - 1;

        question = await questionModel.get(notDoneFinishedQuestionIds[i]);

        return resolve(question);
      }

      resolve(null);
    } catch (e) { return reject(e); }
  });
}
