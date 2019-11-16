exports.up = async (knex) => {
  const doesTableExists = await knex.schema.hasTable('attributes');
  if (!doesTableExists) {
    await knex.schema.createTable('attributes', (table) => {
      table.increments('id');
      table.specificType('name', 'citext').unique();
      table.timestamp('created_at', false).defaultTo(knex.fn.now()).notNullable();
      table.timestamp('updated_at', false).defaultTo(knex.fn.now()).notNullable();
    });
    await knex.raw('CREATE TRIGGER trigger_updated_at BEFORE UPDATE ON attributes FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column()');
  }
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('attributes');
  await knex.raw('DROP TRIGGER IF EXISTS trigger_updated_at ON attributes');
};
