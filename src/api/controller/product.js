const _ = require('lodash');

const variantModel = require('../model/variant');
const productModel = require('../model/product');

const { sendResponse } = require('../utils/response');
const { error } = require('../utils/error');

const getProductList = async (obj) => {
  const { variants, variantsOptions } = await variantModel.getVariantList(obj);

  const variantGroup = _.groupBy(variants, variant => variant.product_id);

  const attributeGroup = _.groupBy(variantsOptions, variant => variant.variants_id);

  const finelOut = [];
  for (let key in variantGroup) {
    const variantArray = [];
    variantGroup[key].map((data) => {
      if (!attributeGroup[data.variants_id])
        return;
      const attributeArray = [];
      attributeGroup[data.variants_id].map((attribute) => {
        if (attribute.attribute_id) {
          attributeArray.push({ attribute_name: attribute.attribute_name, options_value: attribute.options_value });
        }
        return;
      });
      const variantObj = {
        variants_id: data.variants_id,
        variants_name: data.variants_name || data.product_name,
        variants_price: data.variants_price,
        attributes: attributeArray
      };
      variantArray.push(variantObj)
      return null;
    })

    const obj = {
      product_id: variantGroup[key][0].product_id,
      product_name: variantGroup[key][0].product_name,
      product_description: variantGroup[key][0].product_description,
      variants: variantArray
    };
    if (variantArray.length !== 0) {
      finelOut.push(obj);
    }
  }
  return finelOut;
}

exports.getList = async (req, res) => {
  const finelOut = await getProductList(req.query);
  return sendResponse(req, res, 200, { list: finelOut });
}

exports.getVariantDetail = async (req, res) => {
  const variantId = req.params.id;
  const product = _.head(await productModel.getProductByVariantId(variantId));
  if (!product) {
    throw error(404, 'Product not found');
  }

  const finelOut = await getProductList({ product_id: product.product_id });
  return sendResponse(req, res, 200, { variationList: finelOut });
}