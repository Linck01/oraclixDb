const fct = require('../util/fct.js');
const reportModel = require('../models/reportModel.js');
const userModel = require('../models/userModel.js');
const questionModel = require('../models/questionModel.js');
const answerModel = require('../models/answerModel.js');

exports.create = async (req, res, next) => {
  try {
    const user = await userModel.get(req.body.fromUserId);

    if (!user)
      return res.send(fct.apiResponseJson([],'userDoesNotExist'));

    if (fct.isBanned(user))
      return res.send(fct.apiResponseJson([],'userBanned'));

    let reason;
    if (req.body.reason == 'atos')
      reason = 0;
    else if (req.body.reason == 'unrelated')
      reason = 1;
    else
      return res.send(fct.apiResponseJson([],'invalidReportReason'));


    let obj;
    if (req.body.type == 'question')
      obj = await questionModel.get(req.body.typeId);
    else if (req.body.type == 'answer')
      obj = await answerModel.get(req.body.typeId);

    if (!obj)
      return res.send(fct.apiResponseJson([],'questionOrAnswerDoesNotExist'));

    if (obj.fromUserId == req.body.fromUserId)
      return res.send(fct.apiResponseJson([],'cantSelfReport'));

    const report = await reportModel.get(req.body.type,req.body.typeId,req.body.fromUserId);
    if (report)
      return res.send(fct.apiResponseJson([],'reportAlreadyInDB'));

    await reportModel.create(req.body.type,req.body.typeId,req.body.fromUserId,obj.fromUserId,reason)

    res.send(fct.apiResponseJson([],null));
  } catch (e) {
    console.log(e);
    res.send(fct.apiResponseJson([],'reportCreateError'));
  }
}

exports.getTop = async (req, res, next) => {
  try {
    const reports = await reportModel.getTop(req.params.from,req.params.to,req.params.time);

    res.send(fct.apiResponseJson(reports,null));
  } catch (e) {
    console.log(e);
    res.send(fct.apiResponseJson([],'reportGetError'));
  }
}

exports.delete = async (req, res, next) => {
  try {
    await reportModel.delete(req.body.type,req.body.typeId);

    res.send(fct.apiResponseJson([],null));
  } catch (e) {
    console.log(e);
    res.send(fct.apiResponseJson([],'reportGetError'));
  }
}
