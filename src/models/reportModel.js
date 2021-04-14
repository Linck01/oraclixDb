const db = require('./db.js');
const mysql = require('mysql');


exports.get = (type,typeId,fromUserId) => {
  return new Promise(async function (resolve, reject) {
    try {
      const res = await db.query(`SELECT * FROM report WHERE type='${type}' AND typeId=${typeId} AND fromUserId=${fromUserId}`);

      if (res.length == 0)
        return resolve(null);
      else
        return resolve(res[0]);
    } catch (e) { return reject(e); }
  });
}

exports.create = (type,typeId,fromUserId,toUserId,reason) => {
  return new Promise(async function (resolve, reject) {
    try {
      const res = await db.query(`INSERT INTO report (type,typeId,fromUserId,toUserId,reason,addDate) VALUES ('${type}',${typeId},${fromUserId},${toUserId},${reason},${Date.now() / 1000})`);

      return resolve(res.insertId);
    } catch (e) { return reject(e); }
  });
}

exports.getTop = (from,to,time) => {
  return new Promise(async function (resolve, reject) {
    try {
      console.log(from,to,time);
      const res = await db.query(`SELECT toUserId,count(toUserId) AS count FROM report GROUP BY toUserId ORDER BY count DESC LIMIT ` + (from-1) + `,` + (to-(from-1)));

      return resolve(res);
    } catch (e) { return reject(e); }
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
