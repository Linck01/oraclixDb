const db = require('./db.js');
const mysql = require('mysql');


exports.new = (type,typeId,fromUserId) => {
  return new Promise(async function (resolve, reject) {
    db.query(`INSERT IGNORE INTO report (type,typeid,fromuserid) VALUES ('${type}',${typeId},'${fromUserId}')`, function (err, results, fields) {
      if (err) return reject(err);
      return resolve();
    });
  });
}

exports.getAll = () => {
  return new Promise(async function (resolve, reject) {
    db.query(`SELECT * FROM report`, function (err, results, fields) {
      if (err) return reject(err);

      return resolve(results);
    });
  });
}

exports.delete = (type,typeId,fromUserId) => {
  return new Promise(async function (resolve, reject) {
    db.query(`DELETE FROM report WHERE type='${type}' AND typeid='${typeId}'`, function (err, results, fields) {
      if (err) return reject(err);
      return resolve();
    });
  });
}
