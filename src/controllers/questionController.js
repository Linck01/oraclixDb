const questionModel = require('../models/questionModel.js');
const fct = require('../util/fct.js');
const userModel = require('../models/userModel.js');
const categoryModel = require('../models/categoryModel.js');
const answerModel = require('../models/answerModel.js');
const random = require('random');
const geometricDist = random.geometric(p = 0.15);

exports.new = async (req, res, next) => {
  try {
    if (!fct.checkDBApiAuth(req))
      return res.send(fct.apiResponseJson([],'Authorization failed.'));

    const category = await categoryModel.getByName(req.body.categoryName);
    if (!category)
      return res.send(fct.apiResponseJson([],'Not a valid category.'));

    const user = await userModel.get(req.body.authorId);
    const price = category.priceperanswer * req.body.maxanswers;

    if (user.credits < price)
      return res.send(fct.apiResponseJson([],'Not enough credits.'));

    await userModel.addCredits(req.body.authorId,-price);
    const insertId = await questionModel.new(
        req.body.guildId,req.body.channelId,req.body.authorId,
        req.body.categoryName,req.body.text,req.body.maxanswers);

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

exports.getActiveQuestionToAnswer = async (req, res, next) => {
  try {
    const user = await userModel.get(req.params.userId);
    const question = await drawQuestion(req.params.categoryName,req.params.userId)

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

function drawQuestion(categoryName,userId) {
  return new Promise(async function (resolve, reject) {
    try {
      const answeredQuestionIds = await answerModel.getAnsweredQuestionIdsByUserId(userId);
      let i = geometricDist() - 1,question;

      // ACTIVE QUESTIONS
      const activeQuestionIds = await questionModel.getActiveQuestionIds(categoryName,userId);
      const openActiveQuestionIds = activeQuestionIds.diff(answeredQuestionIds);

      if (openActiveQuestionIds.length > 0) {
        while (i >= openActiveQuestionIds.length)
          i = geometricDist() - 1;

        question = await questionModel.get(openActiveQuestionIds[i]);

        return resolve(question);
      }

      // FINISHED QUESTIONS
      const finishedQuestionIds = await questionModel.getRandomFinishedQuestionIds(categoryName,userId);
      const openFinishedQuestionIds = finishedQuestionIds.diff(answeredQuestionIds);

      if (openFinishedQuestionIds.length > 0) {

        while (i >= openFinishedQuestionIds.length)
          i = geometricDist() - 1;

        question = await questionModel.get(openFinishedQuestionIds[i]);

        return resolve(question);
      }

      resolve(null);
    } catch (e) { return reject(e); }
  });
}
