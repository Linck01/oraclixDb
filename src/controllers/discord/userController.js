const userModel = require('../../models/discord/userModel.js');
const fct = require('../../util/fct.js');

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

exports.set = async (req, res, next) => {
  try {
    try {
      if (!fct.checkDBApiAuth(req))
        return res.send(fct.apiResponseJson([],'Authorization failed.'));

      await userModel.set(req.body.guildId,req.body.field,req.body.value);

      res.send(fct.apiResponseJson([],null));
    } catch (e) {
      console.log(e);
      res.send(fct.apiResponseJson([],'Could not modify guild'));
    }
  } catch (e) { console.log(e); }
}

exports.inc = async (req, res, next) => {
  try {
    try {
      if (!fct.checkDBApiAuth(req))
        return res.send(fct.apiResponseJson([],'Authorization failed.'));

      await userModel.inc(req.body.guildId,req.body.field,req.body.value);

      res.send(fct.apiResponseJson([],null));
    } catch (e) {
      console.log(e);
      res.send(fct.apiResponseJson([],'Could not modify guild'));
    }
  } catch (e) { console.log(e); }
}


exports.create = async (req, res, next) => {
  try {
    if (!fct.checkDBApiAuth(req))
      return res.send(fct.apiResponseJson([],'Authorization failed.'));

    const user = await userModel.create(req.body.userId,req.body.username,req.body.tag);

    res.send(fct.apiResponseJson(user,null));
  } catch (e) {
    console.log(e);
    res.send(fct.apiResponseJson([],'Could not get guild'));
  }
}
