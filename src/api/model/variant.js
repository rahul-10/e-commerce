const _ = require('lodash');

const { db } = require('../../configs/db');

exports.getVariant = id => db('variants').select(['*']).where({ id });

exports.getVariantByProductId = product_id => db('variants').select(['*']).where({ product_id });

exports.insertVariant = (obj) => db('variants').insert(obj, ['*']);

exports.insertVariantOption = ({ product_id, variant, price, options, image_url = null }) => {
  const variantObj = { product_id, variant, price };
  return db.transaction(async trx => {
    const variant = await trx('variants').insert(variantObj, ['*']);
    const variantOptions = options.map((id) => {
      return ({ variant_id: variant[0].id, option_id: id })
    })
    return trx('variant_options').insert(variantOptions, ['*'])
  });
}

exports.getVariantList = async (obj) => {
  const limit = (!obj.limit) ? 30 : obj.limit;
  const offset = (!obj.offset) ? 0 : obj.offset;
  let query = db('variants').innerJoin('products', function () {
    this.on('variants.product_id', '=', 'products.id');
  }).limit(limit).offset(offset);

  if (obj.search) {
    query = query.where('products.name', 'ILIKE', `%${obj.search}%`);
  }

  if (obj.product_id) {
    query = query.where({ product_id: obj.product_id });
  }

  const variants = await query.select([
    'products.id as product_id',
    'products.name as product_name',
    'products.description as product_description',
    'variants.id as variants_id',
    'variants.variant as variants_name',
    'variants.price as variants_price',
    'variants.image_url as variants_image_url',
  ]);

  const variantIds = variants.map((obj) => obj.variants_id);
  let newQuery = db('variants').leftJoin('variant_options', function () {
    this.on('variants.id', '=', 'variant_options.variant_id');
  }).leftJoin('options', function () {
    this.on('options.id', '=', 'variant_options.option_id')
  }).leftJoin('attributes', function () {
    this.on('attributes.id', '=', 'options.attribute_id')
  }).whereIn('variants.id', variantIds);

  const variantsOptions = await newQuery.select([
    'attributes.id as attribute_id',
    'attributes.name as attribute_name',
    'options.id as options_id',
    'options.value as options_value',
    'variants.id as variants_id',
    'variants.variant as variants_name',
    'variants.price as variants_price',
  ])
  return { variants, variantsOptions };
}
