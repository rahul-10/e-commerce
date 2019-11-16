exports.up = async (knex) => {
  const doesTableExists = await knex.schema.hasTable('variants');
  if (!doesTableExists) {
    await knex.schema.createTable('variants', (table) => {
      table.increments('id');
      table.integer('product_id').references('id').inTable('products')
      .notNullable()
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      .index();
      table.specificType('variant', 'citext');
      table.specificType('price', 'numeric');
      table.specificType('image_url', 'citext');
      table.timestamp('created_at', false).defaultTo(knex.fn.now()).notNullable();
      table.timestamp('updated_at', false).defaultTo(knex.fn.now()).notNullable();
    });
    await knex.raw('CREATE TRIGGER trigger_updated_at BEFORE UPDATE ON variants FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column()');
  }
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('variants');
  await knex.raw('DROP TRIGGER IF EXISTS trigger_updated_at ON variants');
};
