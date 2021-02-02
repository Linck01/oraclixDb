const db = require('./db.js');
const mysql = require('mysql');


exports.new = (guildId,channelId,authorId,category,text,maxanswers) => {
  return new Promise(async function (resolve, reject) {
    try {
      const results = await db.query(`INSERT INTO question (discordguildid,discordchannelid,userid,category,text,maxanswers,finished,sent) VALUES ('${guildId}','${channelId}','${authorId}','${category}','${text}','${maxanswers}',0,0)`);

      return resolve(results.insertId);
    } catch (e) { return reject(e); }
  });
}

try {

} catch (e) { return reject(e); }

exports.get = (id) => {
  return new Promise(async function (resolve, reject) {
    try {
      const results = await db.query(`SELECT question.*,user.username,user.discordtag FROM question LEFT JOIN user ON question.userid = user.userid WHERE question.id=${id}`);

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
      const results = await db.query(`SELECT * FROM question WHERE userid=${userId} ORDER BY dateadded DESC`);

      return resolve(results);
    } catch (e) { return reject(e); }
  });
}

exports.getActiveQuestionIds = (category,userId) => {
  return new Promise(async function (resolve, reject) {
    try {
      const results = await db.query(`SELECT id FROM question WHERE finished=0 AND category='${category}' AND userid != '${userId}' ORDER BY dateadded ASC`);

      const ids = [];
      for (result of results)
        ids.push(result.id);

      return resolve(ids);
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

      const results = await db.query(`SELECT question.*,user.username,user.discordtag FROM question LEFT JOIN user ON question.userid=user.userid ORDER BY dateadded DESC LIMIT ${(from-1)}, ${(to-(from-1))}`);

      return resolve(results);
    } catch (e) { return reject(e); }
  });
}

exports.getRandomFinishedQuestionIds = (category,userId) => {
  return new Promise(async function (resolve, reject) {
    try {
      const results = await db.query(`SELECT id FROM question WHERE finished=1 AND category='${category}' AND userid != '${userId}' ORDER BY rand() LIMIT 500`);

      const ids = [];
      for (result of results)
        ids.push(result.id);

      return resolve(ids);
    } catch (e) { return reject(e); }
  });
}
