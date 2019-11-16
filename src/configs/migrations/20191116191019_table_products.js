exports.up = async (knex) => {
  const doesTableExists = await knex.schema.hasTable('products');
  if (!doesTableExists) {
    await knex.schema.createTable('products', (table) => {
      table.increments('id');
      table.specificType('name', 'citext').unique();
      table.string('description');
      table.timestamp('created_at', false).defaultTo(knex.fn.now()).notNullable();
      table.timestamp('updated_at', false).defaultTo(knex.fn.now()).notNullable();
    });
    await knex.raw('CREATE TRIGGER trigger_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column()');
  }
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('products');
  await knex.raw('DROP TRIGGER IF EXISTS trigger_updated_at ON products');
};
