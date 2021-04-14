const config = require('../const/config.js');
const discordCommands = require('../const/discord/commands.js');
const fct = require('../util/fct.js');
const utilModel = require('../models/utilModel.js');

const patchnotes = require('../const/patchnotes.js');
const faqs = require('../const/faq.js');
const features = require('../const/features.js');
const termsAndConditions = require('../const/termsAndConditions.js');
const privacyPolicy = require('../const/privacyPolicy.js');

exports.getTexts = async (req, res, next) => {
  try {
    res.send(fct.apiResponseJson({
      discord: {commands: discordCommands},
      patchnotes:patchnotes,
      faqs:faqs,
      features:features,
      termsAndConditions:termsAndConditions,
      privacyPolicy:privacyPolicy
    },null));
  } catch (e) {
    console.log(e);
    res.send(fct.apiResponseJson([],'Could not getTexts.'));
  }
}

exports.getSettings = async (req, res, next) => {
  try {
    const settings = await utilModel.getSettings();

    res.send(fct.apiResponseJson(settings,null));
  } catch (e) {
    console.log(e);
    res.send(fct.apiResponseJson([],'Could not getSettings.'));
  }
}
