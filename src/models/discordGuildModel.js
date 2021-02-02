const db = require('./db.js');
const mysql = require('mysql');
const config = require('../const/config.js');

exports.set = (guildId,field,value) => {
  return new Promise(async function (resolve, reject) {
    db.query(`UPDATE discordguild SET ${field} = ${mysql.escape(value)} WHERE guildid = '${guildId}'`, function (err, results, fields) {
      if (err) return reject(err);
      return resolve();
    });
  });
}

exports.get = (guildId) => {
  return new Promise(async function (resolve, reject) {
    db.query(`SELECT * FROM discordguild WHERE guildid = '${guildId}'`, function (err, results, fields) {
      if (err) return reject(err);
      if (results.length == 0) {
        db.query(`INSERT INTO discordguild (guildid,prefix,internonly)
            VALUES ('${guildId}','${config.defaultPrefix}',0)`,
          function (err, results, fields) {
            if (err) return reject(err);
            db.query(`SELECT * FROM discordguild WHERE guildid = '${guildId}'`, function (err, results, fields) {
              if (err) return reject(err);
              if (results.length == 0)
                return resolve(null);
               else
                return resolve(results[0]);
            });
        });
      } else {
        return resolve(results[0]);
      }
    });
  });
}
