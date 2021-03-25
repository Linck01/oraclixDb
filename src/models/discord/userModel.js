const db = require('../db.js');
const mysql = require('mysql');
const config = require('../../const/config.js');
const userModel = require('../userModel.js');

exports.set = (discord_userId,field,value) => {
  return new Promise(async function (resolve, reject) {
    try {
      await db.query(`UPDATE discord_user SET ${field} = ${mysql.escape(value)} WHERE id = '${discord_userId}'`);
      return resolve();
    } catch (e) { return reject(e); }
  });
}

exports.inc = (discord_userId,field,value) => {
  return new Promise(async function (resolve, reject) {
    try {
      await db.query(`UPDATE discord_user SET ${field} = ${field} + ${mysql.escape(value)} WHERE id = '${discord_userId}'`);
      return resolve();
    } catch (e) { return reject(e); }
  });
}

exports.create = (discord_userId,username,tag) => {
  return new Promise(async function (resolve, reject) {
    try {
      const user = await userModel.create();

      await db.query(`INSERT INTO discord_user (id,userId,username,tag,addDate)
          VALUES ('${discord_userId}','${user.id}','${username}','${tag}',${Date.now() / 1000})`);

      return resolve(await exports.get(discord_userId));
    } catch (e) { return reject(e); }
  });
}

exports.get = (discord_userId) => {
  return new Promise(async function (resolve, reject) {
    try {
      const res = await db.query(`SELECT * FROM discord_user LEFT JOIN user ON discord_user.userId = user.id WHERE discord_user.id = '${discord_userId}'`);

      if (res.length == 0)
          return resolve(null);
      else
          return resolve(res[0]);

    } catch (e) { return reject(e); }
  });
}
