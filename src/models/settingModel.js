const db = require('./db.js');
const mysql = require('mysql');

exports.getAll = () => {
  return new Promise(async function (resolve, reject) {
    try {
      const res = await db.query('SELECT * from setting');
      let settings = {};

      for (setting of res)
        settings[setting.id] = setting.value;

      resolve(settings);
    } catch (e) { reject(e); }
  });
}

exports.inc = (id,value) => {
  return new Promise(async function (resolve, reject) {
    try {
      await db.query(`UPDATE setting SET value = value + ${mysql.escape(value)} WHERE id = ${mysql.escape(id)}`);
      return resolve();
    } catch (e) { return reject(e); }
  });
}
