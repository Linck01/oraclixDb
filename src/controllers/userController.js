const userModel = require('../models/userModel.js');
const answerModel = require('../models/answerModel.js');
const fct = require('../util/fct.js');

exports.get = async (req, res, next) => {
  try {
    if (!fct.checkDBApiAuth(req))
      return res.send(fct.apiResponseJson([],'Authorization failed.'));

    const user = await userModel.get(req.params.id);

    res.send(fct.apiResponseJson(user,null));
  } catch (e) {
    console.log(e);
    res.send(fct.apiResponseJson([],'Could not get guild'));
  }
}

exports.getBySourceId = async (req, res, next) => {
  try {
    if (!fct.checkDBApiAuth(req))
      return res.send(fct.apiResponseJson([],'Authorization failed.'));

    const user = await userModel.getBySourceId(req.params.source,req.params.sourceId);

    res.send(fct.apiResponseJson(user,null));
  } catch (e) {
    console.log(e);
    res.send(fct.apiResponseJson([],'Could not get guild'));
  }
}

exports.create = async (req, res, next) => {
  try {
    try {
      if (!fct.checkDBApiAuth(req))
        return res.send(fct.apiResponseJson([],'Authorization failed.'));

      const id = await userModel.create(req.body.source,req.body.sourceId,req.body.username);

      res.send(fct.apiResponseJson([],null));
    } catch (e) {
      console.log(e);
      res.send(fct.apiResponseJson([],'userUpdateError'));
    }
  } catch (e) { console.log(e); }
}

exports.tip = async (req, res, next) => {
  try {
    try {
      if (!fct.checkDBApiAuth(req))
        return res.send(fct.apiResponseJson([],'Authorization failed.'));

      if (isNaN(req.body.answerId) || isNaN(req.body.amount))
        return res.send(fct.apiResponseJson([],'argumentNotDigit'));

      const user = await userModel.get(req.body.fromUserId);

      if (!user)
        return res.send(fct.apiResponseJson([],'userDoesNotExist'));

      if (req.body.amount <= 0 || req.body.amount > 1)
        return res.send(fct.apiResponseJson([],'tipAmountWrong'));

      if (user.credits < req.body.amount)
        return res.send(fct.apiResponseJson([],'notEnoughCredits'));

      const answer = await answerModel.get(req.body.answerId);

      if (!answer)
        return res.send(fct.apiResponseJson([],'answerNotFound'));

      const toUser = await userModel.get(answer.fromUserId);

      if (!toUser)
        return res.send(fct.apiResponseJson([],'userDoesNotExist'));

      await userModel.inc(user.id,'credits',req.body.amount * -1);
      await userModel.inc(toUser.id,'credits',req.body.amount * 1);

      await userModel.inc(user.id,'creditsTipOut',req.body.amount * 1);
      await userModel.inc(toUser.id,'creditsTipIn',req.body.amount * 1);
      await answerModel.inc(answer.id,'creditsTipped',req.body.amount * 1);

      res.send(fct.apiResponseJson([],null));
    } catch (e) {
      console.log(e);
      res.send(fct.apiResponseJson([],'userUpdateError'));
    }
  } catch (e) { console.log(e); }
}
