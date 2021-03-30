const db = require('./db.js');
const mysql = require('mysql');
const config = require('../const/config.js');
const discord_userModel = require('./discord/userModel.js');

exports.set = (userId,field,value) => {
  return new Promise(async function (resolve, reject) {
    try {
      await db.query(`UPDATE user SET ${field} = ${mysql.escape(value)} WHERE id = '${userId}'`);
      return resolve();
    } catch (e) { return reject(e); }
  });
}

exports.inc = (userId,field,value) => {
  return new Promise(async function (resolve, reject) {
    try {
      await db.query(`UPDATE user SET ${field} = ${field} + ${mysql.escape(value)} WHERE id = '${userId}'`);
      return resolve();
    } catch (e) { return reject(e); }
  });
}

exports.create = () => {
  return new Promise(async function (resolve, reject) {
    try {
      const id = (await db.query(`INSERT INTO user (addDate) VALUES (${Date.now() / 1000})`)).insertId;

      return resolve(await exports.get(id));
    } catch (e) { return reject(e); }
  });
}

exports.get = (id) => {
  return new Promise(async function (resolve, reject) {
    try {
      const res = await db.query(`SELECT * FROM user WHERE id = '${id}'`);

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
