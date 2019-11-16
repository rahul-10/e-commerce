const { db } = require('../../configs/db');

exports.getProductById = id => db('products').select(['*']).where({ id });

exports.getProductByVariantId = variantId => {
  const query = db('products').innerJoin('variants', function () {
    this.on('products.id', '=', 'variants.product_id');
  }).where('variants.id', '=', variantId);

  return query.select([
    'products.id as product_id',
    'products.name as product_name',
    'products.description as product_description',
    'variants.id as variants_id',
    'variants.variant as variants_name',
    'variants.price as variants_price',
    'variants.image_url as variants_image_url'
  ])
}