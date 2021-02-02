const fct = require('../util/fct.js');
const userModel = require('../models/userModel.js');

exports.get = async (req, res, next) => {
  try {
    const user = await userModel.get(req.params.id);

    res.send(fct.apiResponseJson(user,null));
  } catch (e) {
    console.log(e);
    res.send(fct.apiResponseJson([],'Could not get User.'));
  }
}

exports.set = async (req, res, next) => {
  try {
    if (!fct.checkDBApiAuth(req))
      return res.send(fct.apiResponseJson([],'Authorization failed.'));

    await userModel.set(req.body.userId,req.body.field,req.body.value);

    res.send(fct.apiResponseJson([],null));
  } catch (e) {
    console.log(e);
    res.send(fct.apiResponseJson([],'Could not get User.'));
  }
}
