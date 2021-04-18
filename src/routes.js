const express = require('express');
const router = express.Router();
const questionController = require('./controllers/questionController');
const answerController = require('./controllers/answerController');
const discord_guildController = require('./controllers/discord/discord_guildController');
const discord_shardController = require('./controllers/discord/discord_shardController');
const reportController = require('./controllers/reportController');
const viewController = require('./controllers/viewController');
const webhookController = require('./controllers/webhookController');
const utilController = require('./controllers/utilController');
const userController = require('./controllers/userController');

// Views
router.route('/').get(viewController.index);

// Api - Question
router.route('/api/question/create').post(questionController.create);
router.route('/api/question/get/:id').get(questionController.get);
router.route('/api/question/getQuestionToAnswer/:userId').get(questionController.getQuestionToAnswer);
router.route('/api/question/set').put(questionController.set);
router.route('/api/question/getFinishedButNotSent/:source').get(questionController.getFinishedButNotSent);
router.route('/api/question/getLatest/:from/:to').get(questionController.getLatest);
router.route('/api/question/getByUserId/:userId').get(questionController.getByUserId);

// Api - Discord
router.route('/api/discord_guild/get/:id').get(discord_guildController.get);
router.route('/api/discord_guild/set').put(discord_guildController.set);
router.route('/api/discord_guild/create').post(discord_guildController.create);

// Api - User
router.route('/api/user/get/:id').get(userController.get);
router.route('/api/user/getBySourceId/:source/:sourceId').get(userController.getBySourceId);
router.route('/api/user/tip').put(userController.tip);
router.route('/api/user/create').post(userController.create);

// Api - Answer
router.route('/api/answer/get/:id').get(answerController.get);
router.route('/api/answer/create').post(answerController.create);
router.route('/api/answer/getByQuestionId/:questionId').get(answerController.getByQuestionId);
router.route('/api/answer/getByUserId/:userId').get(answerController.getByUserId);

// Api - Report
router.route('/api/report/getTop/:from/:to/:time').get(reportController.getTop);
router.route('/api/report/create').post(reportController.create);
router.route('/api/report/delete').delete(reportController.delete);

// Webhooks
router.route('/webhook/dbl/upvote').post(webhookController.dblUpvote);


// MISC
router.route('/api/util/texts/').get(utilController.getTexts);
router.route('/api/util/settings/').get(utilController.getSettings);
router.route('/api/util/insertUpdateMulti/').put(utilController.insertUpdateMulti);


module.exports = router;
