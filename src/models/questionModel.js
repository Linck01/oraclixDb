const db = require('./db.js');
const mysql = require('mysql');


exports.create = (source,sourceId,fromUserId,text,answerCount) => {
  return new Promise(async function (resolve, reject) {
    try {
      const results = await db.query(`INSERT INTO question (source,sourceId,fromUserId,text,answerCount,addDate) VALUES ('${source}','${sourceId}','${fromUserId}','${text}','${answerCount}',${Date.now() / 1000})`);

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

exports.getByUserId = (userId) => {
  return new Promise(async function (resolve, reject) {
    try {
      const results = await db.query(`SELECT * FROM question WHERE fromUserId = ${userId} ORDER BY addDate DESC`);

      return resolve(results);
    } catch (e) { return reject(e); }
  });
}

exports.getFinishedButNotSent = () => {
  return new Promise(async function (resolve, reject) {
    try {
      const results = await db.query(`SELECT * FROM question WHERE finished=1 AND sent=0`);

      return resolve(results);
    } catch (e) { return reject(e); }
  });
}

exports.getAll = (page) => {
  return new Promise(async function (resolve, reject) {
    try {
      const entriesPerPage = 10;
      const from = Math.max((page-1) * entriesPerPage + 1);
      const to = page * entriesPerPage;

      const results = await db.query(`SELECT question.*,user.* FROM question LEFT JOIN user ON question.fromUserId = user.userId ORDER BY addDate DESC LIMIT ${(from-1)}, ${(to-(from-1))}`);

      return resolve(results);
    } catch (e) { return reject(e); }
  });
}


exports.getNotDoneUnfinishedQuestionIds = (userId) => {
  return new Promise(async function (resolve, reject) {
    try {
      const results = await db.query(`SELECT id FROM question WHERE finished=0 AND fromUserId != ${userId} AND id != (SELECT questionId FROM answer WHERE fromUserId = ${userId}) ORDER BY addDate ASC`);

      const ids = [];
      for (result of results)
        ids.push(result.id);

      return resolve(ids);
    } catch (e) { return reject(e); }
  });
}

exports.getRandomNotDoneFinishedQuestionId = (userId) => {
  return new Promise(async function (resolve, reject) {
    try {
      const results = await db.query(`SELECT id FROM question WHERE finished=1 AND fromUserId != '${userId}' ORDER BY rand() LIMIT 500`);

      const ids = [];
      for (result of results)
        ids.push(result.id);

      return resolve(ids);
    } catch (e) { return reject(e); }
  });
}
