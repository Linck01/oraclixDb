const discordGuildModel = require('../models/discordGuildModel.js');
const fct = require('../util/fct.js');

exports.get = async (req, res, next) => {
  try {
    //console.log(req.params);
    const guild = await discordGuildModel.get(req.params.id);

    res.send(fct.apiResponseJson(guild,null));
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

      await discordGuildModel.set(req.body.guildId,req.body.field,req.body.value);

      res.send(fct.apiResponseJson([],null));
    } catch (e) {
      console.log(e);
      res.send(fct.apiResponseJson([],'Could not modify guild'));
    }
  } catch (e) { console.log(e); }
}
