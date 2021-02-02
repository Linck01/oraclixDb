const express = require('express');
const router = express.Router();
const questionController = require('./controllers/questionController');
const discordGuildController = require('./controllers/discordGuildController');
const categoryController = require('./controllers/categoryController');
const answerController = require('./controllers/answerController');
const userController = require('./controllers/userController');
const reportController = require('./controllers/reportController');
const viewController = require('./controllers/viewController');
const webhookController = require('./controllers/webhookController');
const miscController = require('./controllers/miscController');
const textController = require('./controllers/textController.js');

// Views
router.route('/').get(viewController.index);

// Api - Question
router.route('/api/question/new').post(questionController.new);
router.route('/api/question/get/:id').get(questionController.get);
router.route('/api/question/getActiveQuestionToAnswer/:categoryName/:userId').get(questionController.getActiveQuestionToAnswer);
router.route('/api/question/set').put(questionController.set);
router.route('/api/question/getFinishedButNotSent').get(questionController.getFinishedButNotSent);
router.route('/api/question/getAll/:page').get(questionController.getAll);
router.route('/api/question/getByUserId/:userId').get(questionController.getByUserId);

// Api - DiscordGuild
router.route('/api/discord_guild/get/:id').get(discordGuildController.get);
router.route('/api/discord_guild/set').put(discordGuildController.set);

// Api - Category
router.route('/api/category/get').get(categoryController.getAll);
router.route('/api/category/getByName/:name').get(categoryController.getByName);

// Api - Answer
router.route('/api/answer/new').post(answerController.new);
router.route('/api/answer/getByQuestion/:questionId').get(answerController.getByQuestionId);
router.route('/api/answer/getByUserId/:userId').get(answerController.getByUserId);

// Api - User
router.route('/api/user/get/:id').get(userController.get);
router.route('/api/user/set').put(userController.set);

// Api - Report
router.route('/api/report/new').post(reportController.new);
router.route('/api/report/get').get(reportController.getAll);
router.route('/api/report/delete').post(reportController.delete);

// Webhooks
router.route('/webhook/dbl/upvote').post(webhookController.dblUpvote);

// MISC
router.route('/api/misc/getDiscordCommandsJson/:guildId').get(miscController.getDiscordCommandsJson);

// Text
router.route('/api/texts/').get(textController.getTexts);


module.exports = router;
