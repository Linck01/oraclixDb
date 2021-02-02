const fct = require('../util/fct.js');
const path = require("path");
const fs = require('fs');

const discord_commands = require('../const/discord_commands.js');
const patchnotes = require('../const/patchnotes.js');
const faqs = require('../const/faq.js');
const features = require('../const/features.js');
const termsAndConditions = require('../const/termsAndConditions.js');
const privacyPolicy = require('../const/privacyPolicy.js');

exports.getTexts = async (req, res, next) => {
  try {
    //console.log('AAA', footerJs);
    res.send({discord_commands:discord_commands,patchnotes:patchnotes,feedbacks:feedbacks,faqs:faqs,features:features,termsAndConditions:termsAndConditions,privacyPolicy:privacyPolicy});
  } catch (e) {
    console.log(e);
    res.send(fct.apiResponseJson([],'Could not get guildchannel by guildId.'));
  }
}
