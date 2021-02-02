const db = require('./db.js');
const mysql = require('mysql');
const config = require('../const/config.js');

exports.addCredits = (id,credits) => {
  return new Promise(async function (resolve, reject) {
    db.query(`UPDATE user SET credits = credits + ${credits} WHERE userid = '${id}'`, function (err, results, fields) {
      if (err) return reject(err);
      return resolve();
    });
  });
}

exports.get = (id) => {
  return new Promise(async function (resolve, reject) {
    db.query(`SELECT * FROM user WHERE userid = '${id}'`, function (err, results, fields) {
      if (err) return reject(err);

      if (results.length > 0)
        return resolve(results[0]);

      db.query(`INSERT INTO user (userid,username,discordtag,credits,banned,lastupvotedbl)
          VALUES ('${id}','','',${config.startCredits},'1970-01-01 00:00:00','1970-01-01 00:00:00')`,
        function (err, results, fields) {
          if (err) return reject(err);
          db.query(`SELECT * FROM user WHERE userid = '${id}'`, function (err, results, fields) {
            if (err) return reject(err);
            if (results.length == 0)
              return resolve(null);
             else
              return resolve(results[0]);
          });
      });
    });
  });
}

exports.set = (id,field,value) => {
  return new Promise(async function (resolve, reject) {
    db.query(`UPDATE user SET ${field} = ${mysql.escape(value)} WHERE userid = '${id}'`, function (err, results, fields) {
      if (err) return reject(err);
      return resolve();
    });
  });
}
