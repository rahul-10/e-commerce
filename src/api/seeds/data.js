exports.productList = [
  {
    name: 'Apple iPhone X',
    description: '5.8-inch Super Retina display (OLED) with HDR',
    doesVariant: true,
    attributes: [{ key: 'color', values: ['red', 'white', 'blue'] }, { key: 'storage', values: ['64 GB', '128 GB', '256 GB'] }],
    variants: [{ name: 'red-64GB', price: '90000' }, { name: 'white-64GB', price: '90500' }, { name: 'blue-64GB', price: '91000' },
    { name: 'red-128GB', price: '100000' }, { name: 'white-128GB', price: '100500' }, { name: 'blue-128GB', price: '101000' },
    { name: 'red-256GB', price: '150000' }, { name: 'white-256GB', price: '150500' }, { name: 'blue-256GB', price: '150100' }]
  },
  {
    name: 'USB Cable',
    description: 'Compatible with USB 1.1',
    doesVariant: false,
    price: 499
  }
]