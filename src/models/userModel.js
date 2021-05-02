const db = require('./db.js');
const mysql = require('mysql');
const config = require('../const/config.js');

exports.set = (id,field,value) => {
  return new Promise(async function (resolve, reject) {
    try {
      await db.query(`UPDATE user SET ${field} = ${mysql.escape(value)} WHERE id = '${id}'`);
      return resolve();
    } catch (e) { return reject(e); }
  });
}

exports.inc = (id,field,value) => {
  return new Promise(async function (resolve, reject) {
    try {
      await db.query(`UPDATE user SET ${field} = ${field} + ${mysql.escape(value)} WHERE id = ${id}`);
      return resolve();
    } catch (e) { return reject(e); }
  });
}

exports.create = (source,sourceId,username) => {
  return new Promise(async function (resolve, reject) {
    try {
      const id = (await db.query(`INSERT INTO user (source,sourceId,username,addDate) VALUES (${source},'${sourceId}',${mysql.escape(username)},${Date.now() / 1000})`)).insertId;

      return resolve(await exports.get(id));
    } catch (e) { return reject(e); }
  });
}

exports.get = (id) => {
  return new Promise(async function (resolve, reject) {
    try {
      const res = await db.query(`SELECT * FROM user WHERE id = ${id}`);

      if (res.length == 0)
          return resolve(null);
      else
          return resolve(res[0]);

    } catch (e) { return reject(e); }
  });
}

exports.getBySourceId = (source,sourceId) => {
  return new Promise(async function (resolve, reject) {
    try {
      const res = await db.query(`SELECT * FROM user WHERE source = ${source} AND sourceId = '${sourceId}'`);

      if (res.length == 0)
          return resolve(null);
      else
          return resolve(res[0]);

    } catch (e) { return reject(e); }
  });
}
/*
exports.getUserFromSource = (source,id) => {
  return new Promise(async function (resolve, reject) {
    try {
      let user;
      if (source = 'discord')
        sourceUser = await discord_userModel.get(id);
      else
        return reject('Unknown source at getUserFromSource().');

      if (sourceUser)
        return resolve(await exports.get(sourceUser.userId));
      else
        return resolve(null);
    } catch (e) { reject(e); }
  });
}
*/
