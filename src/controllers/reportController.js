const fct = require('../util/fct.js');
const reportModel = require('../models/reportModel.js');


exports.create = async (req, res, next) => {
  try {
    const user = await userModel.get(req.body.userId);

    if (!user)
      return res.send(fct.apiResponseJson([],'userDoesNotExist'));

    if (fct.isBanned(user))
      return res.send(fct.apiResponseJson([],'userBanned'));

    let obj;
    if (req.body.type == 'question')
      obj = await questionModel.get(req.body.typeId);
    else if (req.body.type == 'answer')
      obj = await answerModel.get(req.body.typeId);

    if (!obj)
      return res.send(fct.apiResponseJson([],'questionOrAnswerDoesNotExist'));

    if (obj.userId == req.body.userId)
      return res.send(fct.apiResponseJson([],'cantSelfReport'));

    await questionModel

    res.send(fct.apiResponseJson([],null));
  } catch (e) {
    console.log(e);
    res.send(fct.apiResponseJson([],'reportCreateError'));
  }
}

exports.getTop = async (req, res, next) => {
  try {
    const reports = await reportModel.getAll();

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
