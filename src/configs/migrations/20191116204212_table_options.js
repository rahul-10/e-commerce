exports.up = async (knex) => {
  const doesTableExists = await knex.schema.hasTable('options');
  if (!doesTableExists) {
    await knex.schema.createTable('options', (table) => {
      table.increments('id');
      table.specificType('value', 'citext').unique();
      table.integer('attribute_id').references('id').inTable('attributes')
        .notNullable()
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .index();
      table.timestamp('created_at', false).defaultTo(knex.fn.now()).notNullable();
      table.timestamp('updated_at', false).defaultTo(knex.fn.now()).notNullable();
    });
    await knex.raw('CREATE TRIGGER trigger_updated_at BEFORE UPDATE ON options FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column()');
  }
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('options');
  await knex.raw('DROP TRIGGER IF EXISTS trigger_updated_at ON options');
};
