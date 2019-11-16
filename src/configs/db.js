const knex = require('knex');
const knexPostgis = require('knex-postgis');
const { types } = require('pg');
const config = require('./knexfile');

const NUMERIC = 1700;


const parseNumeric = val => Number(val);
types.setTypeParser(NUMERIC, parseNumeric);

const db = knex(config);
const st = knexPostgis(db);

module.exports = {
  db,
  st,
};
