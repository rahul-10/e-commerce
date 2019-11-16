exports.addVariant = {
  type: 'object',
  properties: {
    product_id: {
      type: 'number',
      minimum: 1,
    },
    is_varient: {
      trpe: 'bolean',
    },
    variant: {
      type: 'string',
      minLength: 1,
    },
    price: {
      type: 'number',
      minLength: 0,
    },
    options: {
      type: 'array',
      items: {
        type: 'number',
        minimum: 1
      },
    },
  },
  if: {
    properties: {
      is_varient: { enum: [true] },
    },
  },
  then: {
    required: ['options']
  },
  required: ['product_id', 'price', 'is_varient']
};
