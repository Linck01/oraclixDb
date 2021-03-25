const questionModel = require('../models/questionModel.js');
const fct = require('../util/fct.js');
const userModel = require('../models/userModel.js');
const answerModel = require('../models/answerModel.js');
const drawHistoryModel = require('../models/drawHistoryModel.js');
const random = require('random');
const geometricDist = random.geometric(p = 0.15);

exports.create = async (req, res, next) => {
  try {
    if (!fct.checkDBApiAuth(req))
      return res.send(fct.apiResponseJson([],'Authorization failed.'));

    const user = await userModel.get(req.body.userId);
    const price = req.body.answerCount;

    if (user.credits < price)
      return res.send(fct.apiResponseJson([],'Not enough credits.'));

    if (fct.isBanned(user))
      return res.send(fct.apiResponseJson([],'User is still banned.'));

    await userModel.inc(req.body.userId,'credits',price * -1);
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
      const questions = await questionModel.getNotDoneNotDrawnUnfinishedQuestions(userId);
      const drawHistory = await drawHistoryModel.getActive();

      let pendingAnswers,finalQuestion;
      for (let question of questions) {
        pendingAnswers = drawHistory.filter(h => h.questionId == question.id).length;
        if (question.currentAnswers + pendingAnswers < question.maxAnswers) {
          finalQuestion = await questionModel.get(question.id);
          break;
        }
      }

      if (!finalQuestion)
        finalQuestion = await questionModel.getRandomNotDoneNotDrawnFinishedQuestion(userId);

      if (finalQuestion)
        await drawHistoryModel.create(finalQuestion.id,userId);

      console.log('finalQuestion ',finalQuestion);
      return resolve(finalQuestion);
    } catch (e) { return reject(e); }
  });
}
