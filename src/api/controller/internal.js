const { head } = require('lodash');
const productModel = require('../model/product');
const optionModel = require('../model/option');
const varientModel = require('../model/variant');

const { error } = require('../utils/error');
const { sendResponse } = require('../utils/response');

exports.addVariant = async (req, res) => {
  const { product_id, is_varient, variant, price, options } = req.body;
  const product = head(await productModel.getProductById(product_id));
  if (!product) {
    throw error(404, 'Product not found');
  }


  if (!is_varient) {
    const obj = { product_id, price, image_url: req.body.image_url}
    const data = head(await varientModel.insertVariant(obj))
    return sendResponse(req, res, 200, { variant: data });
  }

  const optionList = await optionModel.getOptinsByIds(options);
  if (!optionList && optionList.length !== options.length) {
    throw error(404, 'One or more option not found');
  }

  const result = await varientModel.insertVariantOption(req.body)
  return sendResponse(req, res, 200, { variantOprions: result });
}