const express = require('express');
const router = express.Router();
const questionController = require('./controllers/questionController');
const answerController = require('./controllers/answerController');
const discordGuildController = require('./controllers/discord/guildController');
const discordUserController = require('./controllers/discord/userController');
const reportController = require('./controllers/reportController');
const viewController = require('./controllers/viewController');
const webhookController = require('./controllers/webhookController');
const miscController = require('./controllers/miscController');

// Views
router.route('/').get(viewController.index);

// Api - Question
router.route('/api/question/create').post(questionController.create);
router.route('/api/question/get/:id').get(questionController.get);
router.route('/api/question/getQuestionToAnswer/:userId').get(questionController.getQuestionToAnswer);
router.route('/api/question/set').put(questionController.set);
router.route('/api/question/getFinishedButNotSent').get(questionController.getFinishedButNotSent);
router.route('/api/question/getAll/:page').get(questionController.getAll);
router.route('/api/question/getByUserId/:userId').get(questionController.getByUserId);

// Api - DiscordGuild
router.route('/api/discord_guild/get/:id').get(discordGuildController.get);
router.route('/api/discord_guild/set').put(discordGuildController.set);
router.route('/api/discord_guild/create').post(discordGuildController.create);
router.route('/api/discord_user/get/:id').get(discordUserController.get);
router.route('/api/discord_user/set').put(discordUserController.set);
router.route('/api/discord_user/inc').put(discordUserController.inc);
router.route('/api/discord_user/create').post(discordUserController.create);

// Api - Answer
router.route('/api/answer/get/:id').get(answerController.get);
router.route('/api/answer/create').post(answerController.create);
router.route('/api/answer/getByQuestion/:questionId').get(answerController.getByQuestionId);
router.route('/api/answer/getByUserId/:userId').get(answerController.getByUserId);

// Api - Report
router.route('/api/report/getTop').get(reportController.getTop);
router.route('/api/report/create').post(reportController.create);
router.route('/api/report/delete').delete(reportController.delete);

// Webhooks
router.route('/webhook/dbl/upvote').post(webhookController.dblUpvote);

// MISC
router.route('/api/misc/texts/').get(miscController.getTexts);
router.route('/api/misc/settings/').get(miscController.getSettings);


module.exports = router;
