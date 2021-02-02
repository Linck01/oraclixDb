const fetch = require('node-fetch');
const mysql = require('promise-mysql');
let keys = require('../const/keys').get();
let dbHost,dbpassword,dbname,dbhost,pool;

module.exports.query = (sql) => {
  return new Promise(async function (resolve, reject) {
    try {
      if (!pool)
        await createPool();

      resolve(await pool.query(sql));
    } catch (e) { reject(e); }
  });
};

module.exports.getConnection = () => {
  return new Promise(async function (resolve, reject) {
    try {
      if (!pool)
        await module.exports.createPool();

      resolve(await pool.getConnection());
    } catch (e) { reject(e); }
  });
};

const createPool = () => {
  return new Promise(async function (resolve, reject) {
    try {
      if (!pool) {
        pool = await mysql.createPool({
          host                : keys.dbHost,
          user                : keys.dbUser,
          password            : keys.dbPassword,
          database            : keys.dbName,
          dateStrings         : 'date',
          charset             : 'utf8mb4',
          supportBigNumbers   : true,
          bigNumberStrings    : true,
          connectionLimit     : 3
        });

        pool.on('error', function(err) {
          console.log('ManagerDb pool error.');
          if(err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.log('PROTOCOL_CONNECTION_LOST for manager @' + dbHost + '. Deleting connection.');
            pool = null;
          } else { throw err; }
        });

        console.log('Establishing connection to zorahDb @' + keys.dbHost + '.');
      }

      resolve(pool);
    } catch (e) { reject(e); }
  });
};



exports.fetch = (body,route,method) => {
  return new Promise(async function (resolve, reject) {
    try {
      let res;

      const requestObject = {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'authorization': keys.managerApiAuth
        },
        //timeout: 12000,
      };

      if (body != null)
        requestObject.body = JSON.stringify(body);

      res = await fetch('http://' + keys.managerHost + route, requestObject);

      res = await res.json();
      if (res.error != null)
        return reject('Remote DB Error: ' + res.error);

      if(res.results)
        resolve(res.results);
      else
        resolve(res);
    } catch (e) { reject('Fetch Error in backup.api.call(): ' + e); }
  });
}
