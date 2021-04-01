const db = require('../db.js');
const mysql = require('mysql');
const config = require('../../const/config.js');

exports.set = (guildId,field,value) => {
  return new Promise(async function (resolve, reject) {
    try {
      await db.query(`UPDATE discord_guild SET ${field} = ${mysql.escape(value)} WHERE guildId = '${guildId}'`);
      return resolve();
    } catch (e) { return reject(e); }
  });
}

exports.create = (guildId) => {
  return new Promise(async function (resolve, reject) {
    try {
      await db.query(`INSERT INTO discord_guild (guildId,prefix,addDate)
          VALUES ('${guildId}','${config.defaultPrefix}',${Date.now() / 1000})`);

      return resolve(await exports.get(guildId));
    } catch (e) { return reject(e); }
  });
}

exports.get = (guildId) => {
  return new Promise(async function (resolve, reject) {
    try {
      const res = await db.query(`SELECT * FROM discord_guild WHERE guildId = '${guildId}'`);

      if (res.length == 0)
          return resolve(null);
      else
          return resolve(res[0]);

    } catch (e) { return reject(e); }
  });
}
