const db = require('./db.js');
const mysql = require('mysql');
const answerSentences = require('../const/answerSentences.js');

exports.new = (questionId,userId,text) => {
  return new Promise(async function (resolve, reject) {
    try {
      let answerSentenceIndex,answers,possibleSentenceIndices = [];
      for (let i = 0; i < answerSentences.length;i++)
        possibleSentenceIndices.push(i);

        answers = await exports.getByQuestionId(questionId);
        for (answer of answers)
          possibleSentenceIndices.unset(answer.answersentenceindex);


      if (possibleSentenceIndices.lenght == 0)
        answerSentenceIndex = Math.floor(Math.random() * answerSentences.length);
      else
        answerSentenceIndex = possibleSentenceIndices[Math.floor(Math.random() * possibleSentenceIndices.length)];

      await db.query(`INSERT INTO answer (questionid,userid,text,answersentenceindex) VALUES (${questionId},'${userId}',${mysql.escape(text)},${answerSentenceIndex})`);

      return resolve();
    } catch (e) { return reject(e); }
  });
}

exports.set = (id,field,value) => {
  return new Promise(async function (resolve, reject) {
    try {
      await db.query(`UPDATE answer SET ${field} = ${mysql.escape(value)} WHERE id=${id}`);

      return resolve();
    } catch (e) { return reject(e); }
  });
}

exports.get = (id) => {
  return new Promise(async function (resolve, reject) {
    try {
      const results = await db.query(`SELECT * FROM answer WHERE id=${id}`);
      if (results.length == 0)
        return resolve(null);
      else
        return resolve(results[0]);
    } catch (e) { return reject(e); }
  });
}

exports.getByQuestionId = (questionId) => {
  return new Promise(async function (resolve, reject) {
    try {
      const results = await db.query(`SELECT answer.*,user.username,user.discordtag FROM answer LEFT JOIN user ON answer.userid = user.userid WHERE questionid=${questionId}`);
      for (result of results) {
        result.answerSentence = answerSentences[result.answersentenceindex].replace('<name>',result.username) + ':';
      }
      return resolve(results);
    } catch (e) { return reject(e); }
  });
}

exports.getByUserId = (userId) => {
  return new Promise(async function (resolve, reject) {
    try {
      const results = await db.query(`SELECT * FROM answer WHERE userid=${userId} ORDER BY dateadded DESC`);

      return resolve(results);
    } catch (e) { return reject(e); }
  });
}

exports.exists = (userId,questionId) => {
  return new Promise(async function (resolve, reject) {
    try {
      const results = await db.query(`SELECT * FROM answer WHERE userId=${userId} AND questionId = ${questionId} ORDER BY dateadded DESC`);

      if (results.length == 0)
        return resolve(false);
      else
        return resolve(true);
    } catch (e) { return reject(e); }
  });
}

/*
exports.getAnsweredQuestionIdsByUserId = (userId) => {
  return new Promise(async function (resolve, reject) {
    try {
      const results = await db.query(`SELECT questionid FROM answer WHERE userId='${userId}'`);

      const ids = [];
      for (result of results)
        ids.push(result.questionid);

      return resolve(ids);
    } catch (e) { return reject(e); }
  });
}*/
