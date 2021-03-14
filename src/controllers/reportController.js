const fct = require('../util/fct.js');
const reportModel = require('../models/reportModel.js');

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

exports.create = async (req, res, next) => {
  try {
    //await reportModel.delete(req.body.type,req.body.typeId);

    res.send(fct.apiResponseJson([],null));
  } catch (e) {
    console.log(e);
    res.send(fct.apiResponseJson([],'Could not delete report.'));
  }
}
