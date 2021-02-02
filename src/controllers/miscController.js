const config = require('../const/config.js');
const discord_commands = require('../const/discord_commands.js');
const discordGuildModel = require('../models/discordGuildModel.js');
const fct = require('../util/fct.js');

exports.getDiscordCommandsJson = async (req, res, next) => {
  try {
    res.send(fct.apiResponseJson(discord_commands,null));
  } catch (e) {
    console.log(e);
    res.send(fct.apiResponseJson([],'Could not get reports.'));
  }
}
