const config = require('../const/config.js');

exports.apiResponseJson = (results,error) => {
  if (error != null)
    error = '"' + error + '"';

  return '{ "error":'+error+', "results":'+ JSON.stringify(results) +'}';

}

exports.checkDBApiAuth = (req) => {
  if (req.headers.authorization != config.DBApiAuth)
    return false;
    //'DBApi Authorization failed to ' + req.baseUrl + req.originalUrl +'. Auth: ' + req.headers.authorization

  return true;
}

// System
exports.waitAndReboot = async (milliseconds) => {
  try {
    console.log('Restarting in ' + milliseconds/1000 + 's');
    await exports.sleep(milliseconds);
    console.log('Restart');
    process.exit();

  } catch (err) { console.log(err); }
}

exports.sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}
