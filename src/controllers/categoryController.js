const fct = require('../util/fct.js');
const categoryModel = require('../models/categoryModel.js');


exports.getAll = async (req, res, next) => {
  try {
    const categories = await categoryModel.getAll();

    res.send(fct.apiResponseJson(categories,null));
  } catch (e) {
    console.log(e);
    res.send(fct.apiResponseJson([],'Could not add new Question'));
  }
}

exports.getByName = async (req, res, next) => {
  try {
    const category = await categoryModel.getByName(req.params.name);

    res.send(fct.apiResponseJson(category,null));
  } catch (e) {
    console.log(e);
    res.send(fct.apiResponseJson([],'Could not add new Question'));
  }
}
