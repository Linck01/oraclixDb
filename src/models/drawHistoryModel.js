const db = require('./db.js');
const mysql = require('promise-mysql');
const config = require('../const/config.js');

exports.getActive = () => {
  return new Promise(async function (resolve, reject) {
    try {
      const res = await db.query(`SELECT * from drawHistory WHERE addDate > ${Date.now() / 1000} - ${config.answerTimeFrameS}`);

      /*let obj = {};
      for (row of res) {
        if (!obj[row.questionId])
         obj[row.questionId] = [];

        obj[row.questionId].push({})
      }*/

      resolve(res);
    } catch (e) { reject(e); }
  });
}

exports.create = (questionId,userId) => {
  return new Promise(async function (resolve, reject) {
    try {
      const results = await db.query(`INSERT INTO drawHistory (questionId,userId,addDate) VALUES ('${questionId}','${userId}',${Date.now() / 1000})`);

      return resolve(results.insertId);
    } catch (e) { return reject(e); }
  });
}
