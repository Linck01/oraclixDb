const discord_guildModel = require('../../models/discord/discord_guildModel.js');
const fct = require('../../util/fct.js');

exports.get = async (req, res, next) => {
  try {
    if (!fct.checkDBApiAuth(req))
      return res.send(fct.apiResponseJson([],'Authorization failed.'));

    const guild = await discord_guildModel.get(req.params.id);

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

      await discord_guildModel.set(req.body.guildId,req.body.field,req.body.value);

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

    const guild = await discord_guildModel.create(req.body.guildId);

    res.send(fct.apiResponseJson(guild,null));
  } catch (e) {
    console.log(e);
    res.send(fct.apiResponseJson([],'Could not get guild'));
  }
}
