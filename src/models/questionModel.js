const db = require('./db.js');
const mysql = require('mysql');


exports.create = (source,sourceId,fromUserId,text,maxAnswers) => {
  return new Promise(async function (resolve, reject) {
    try {
      const results = await db.query(`INSERT INTO question (source,sourceId,fromUserId,text,maxAnswers,addDate) VALUES ('${source}','${sourceId}','${fromUserId}','${text}','${maxAnswers}',${Date.now() / 1000})`);

      return resolve(results.insertId);
    } catch (e) { return reject(e); }
  });
}

exports.get = (id) => {
  return new Promise(async function (resolve, reject) {
    try {
      const results = await db.query(`SELECT * FROM question WHERE question.id=${id}`);

      if (results.length == 0)
        return resolve(null);
      else
        return resolve(results[0]);
    } catch (e) { return reject(e); }
  });
}

exports.set = (id,field,value) => {
  return new Promise(async function (resolve, reject) {
    try {
      await db.query(`UPDATE question SET ${field} = ${mysql.escape(value)} WHERE id=${id}`);

      return resolve();
    } catch (e) { return reject(e); }
  });
}

exports.inc = (id,field,value) => {
  return new Promise(async function (resolve, reject) {
    try {
      await db.query(`UPDATE question SET ${field} = ${field} + ${mysql.escape(value)} WHERE id = '${id}'`);
      return resolve();
    } catch (e) { return reject(e); }
  });
}


exports.getByUserId = (userId) => {
  return new Promise(async function (resolve, reject) {
    try {
      const results = await db.query(`SELECT * FROM question WHERE fromUserId = ${userId} ORDER BY addDate DESC`);

      return resolve(results);
    } catch (e) { return reject(e); }
  });
}

exports.getFinishedButNotSent = (source) => {
  return new Promise(async function (resolve, reject) {
    try {
      const results = await db.query(`SELECT * FROM question WHERE currentAnswers >= maxAnswers AND sent=0 AND source='${source}'`);

      return resolve(results);
    } catch (e) { return reject(e); }
  });
}

exports.getLatest = (from,to) => {
  return new Promise(async function (resolve, reject) {
    try {
      const results = await db.query(`SELECT * FROM question ORDER BY addDate DESC LIMIT ${(from-1)}, ${(to-(from-1))}`);

      return resolve(results);
    } catch (e) { return reject(e); }
  });
}


exports.getNotDoneNotDrawnUnfinishedQuestions = (userId) => {
  return new Promise(async function (resolve, reject) {
    try {
      const results = await db.query(`SELECT id,currentAnswers,maxAnswers FROM question WHERE currentAnswers < maxAnswers AND fromUserId != ${userId} AND id NOT IN (SELECT questionId FROM answer WHERE fromUserId = ${userId}) AND id NOT IN (SELECT questionId FROM drawHistory WHERE userId = ${userId}) ORDER BY addDate ASC`);

      /*const ids = [];
      for (result of results)
        ids.push(result.id);*/

      return resolve(results);
    } catch (e) { return reject(e); }
  });
}

exports.getRandomNotDoneNotDrawnFinishedQuestion = (userId) => {
  return new Promise(async function (resolve, reject) {
    try {
      const results = await db.query(`SELECT * FROM question WHERE currentAnswers >= maxAnswers AND fromUserId != '${userId}' AND id NOT IN (SELECT questionId FROM answer WHERE fromUserId = ${userId}) AND id NOT IN (SELECT questionId FROM drawHistory WHERE userId = ${userId}) ORDER BY rand() LIMIT 1`);

      if (results.length > 0)
        return resolve(results[0]);
      else
        return resolve(null);
    } catch (e) { return reject(e); }
  });
}
