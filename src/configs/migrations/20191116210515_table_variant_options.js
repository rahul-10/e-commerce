exports.up = async (knex) => {
  const doesTableExists = await knex.schema.hasTable('variant_options');
  if (!doesTableExists) {
    await knex.schema.createTable('variant_options', (table) => {
      table.increments('id');
      table.integer('variant_id').references('id').inTable('variants')
      .notNullable()
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      .index();
      table.integer('option_id').references('id').inTable('options')
      .notNullable()
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      .index();
      table.timestamp('created_at', false).defaultTo(knex.fn.now()).notNullable();
      table.timestamp('updated_at', false).defaultTo(knex.fn.now()).notNullable();
    });
    await knex.raw('CREATE TRIGGER trigger_updated_at BEFORE UPDATE ON variant_options FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column()');
  }
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('variant_options');
  await knex.raw('DROP TRIGGER IF EXISTS trigger_updated_at ON variant_options');
};
