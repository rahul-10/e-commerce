const { productList } = require('./data');

exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await knex('products').del();
  await knex('attributes').del();

  for (let i = 0; i < productList.length; i++) {
    const currentObj = productObj[i];
    const productObj = {
      name: currentObj.name,
      description: currentObj.description
    };
    const [product] = await knex('products').insert(productObj, ['*']);
    if (currentObj.doesVariant === true) {
      for (let j = 0; j < currentObj.attributes.length; j++) {
        const currAttributeObj = currentObj.attributes[j];
        const [attribute] = await knex('attributes').insert({ name: currAttributeObj.key}, ['*']);
        const optionArray = currAttributeObj.values.map(value = ({ attribute_id: attribute.id, value }))
      }
      const attributeObj = {

      }
    }
  }

  return knex('oems').insert(oems, ['*']);
};
