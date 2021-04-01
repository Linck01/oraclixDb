const express = require('express');
const router = express.Router();
const questionController = require('./controllers/questionController');
const answerController = require('./controllers/answerController');
const discord_guildController = require('./controllers/discord/discord_guildController');
const discord_userController = require('./controllers/discord/discord_userController');
const reportController = require('./controllers/reportController');
const viewController = require('./controllers/viewController');
const webhookController = require('./controllers/webhookController');
const miscController = require('./controllers/miscController');
const userController = require('./controllers/userController');

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

// Api - Discord User & Discord Guild
router.route('/api/discord_guild/get/:id').get(discord_guildController.get);
router.route('/api/discord_guild/set').put(discord_guildController.set);
router.route('/api/discord_guild/create').post(discord_guildController.create);
router.route('/api/discord_user/get/:id').get(discord_userController.get);
router.route('/api/discord_user/set').put(discord_userController.set);
router.route('/api/discord_user/inc').put(discord_userController.inc);
router.route('/api/discord_user/create').post(discord_userController.create);

// Api - User
router.route('/api/user/get/:id').get(userController.get);
router.route('/api/user/set').put(userController.set);

// Api - Answer
router.route('/api/answer/get/:id').get(answerController.get);
router.route('/api/answer/create').post(answerController.create);
router.route('/api/answer/getByQuestion/:questionId').get(answerController.getByQuestionId);
router.route('/api/answer/getByUserId/:userId').get(answerController.getByUserId);

// Api - Report
router.route('/api/report/getTop/:from/:to/:time').get(reportController.getTop);
router.route('/api/report/create').post(reportController.create);
router.route('/api/report/delete').delete(reportController.delete);

// Webhooks
router.route('/webhook/dbl/upvote').post(webhookController.dblUpvote);

// MISC
router.route('/api/misc/texts/').get(miscController.getTexts);
router.route('/api/misc/settings/').get(miscController.getSettings);


module.exports = router;
