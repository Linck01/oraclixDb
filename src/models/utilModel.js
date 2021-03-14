const db = require('./db.js');
const mysql = require('promise-mysql');

exports.getSettings = () => {
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


exports.insertUpdateMulti = (tableName,array) => {
  return new Promise(async function (resolve, reject) {
    try {

      if (!array || array.length == 0)
        return '';

      const keys = Object.keys(array[0]);
      let updateSqls = [];
      for (let key of keys)
        updateSqls.push(key + '=VALUES(' + key + ')');

      let valueSqls = [],values;
      for (let obj of array) {
        values = [];
        for (let key of keys)
          values.push(mysql.escape(obj[key]));

        valueSqls.push('(' + values.join(',') + ')');
      }

      await managerDb.query(`INSERT INTO botShardStat (${keys.join(',')})
          VALUES ${valueSqls.join(',')} ON DUPLICATE KEY UPDATE ${updateSqls.join(',')}`);

      return resolve();
    } catch (e) { reject(e); }
  });
};
