const fct = require('../util/fct.js');
const reportModel = require('../models/reportModel.js');

exports.new = async (req, res, next) => {
  try {
    if (!fct.checkDBApiAuth(req))
      return res.send(fct.apiResponseJson([],'Authorization failed.'));

    await reportModel.new(req.body.type,req.body.typeId,req.body.fromUserId);

    res.send(fct.apiResponseJson([],null));
  } catch (e) {
    console.log(e);
    res.send(fct.apiResponseJson([],'Could not add new report.'));
  }
}

exports.getAll = async (req, res, next) => {
  try {
    const reports = await reportModel.getAll();

    res.send(fct.apiResponseJson(reports,null));
  } catch (e) {
    console.log(e);
    res.send(fct.apiResponseJson([],'Could not get reports.'));
  }
}

exports.delete = async (req, res, next) => {
  try {
    await reportModel.delete(req.body.type,req.body.typeId);

    res.send(fct.apiResponseJson([],null));
  } catch (e) {
    console.log(e);
    res.send(fct.apiResponseJson([],'Could not delete report.'));
  }
}
