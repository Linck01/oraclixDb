const db = require('./db.js');

exports.getByName = (name) => {
  return new Promise(async function (resolve, reject) {
    db.query(`SELECT * FROM category WHERE name='${name}'`, function (err, results, fields) {
      if (err) return reject(err);
      if (results.length == 0)
        return resolve(null);
       else
        return resolve(results[0]);
    });
  });
}

exports.addPrice = (categoryName,value) => {
  return new Promise(async function (resolve, reject) {
    db.query(`UPDATE category SET priceperanswer = priceperanswer + ${value} WHERE name = '${categoryName}'`, function (err, results, fields) {
      if (err) return reject(err);
      return resolve();
    });
  });
}

exports.getAll = () => {
  return new Promise(async function (resolve, reject) {
    db.query(`SELECT * FROM category`, function (err, results, fields) {
      if (err) return reject(err);
      return resolve(results);
    });
  });
}
