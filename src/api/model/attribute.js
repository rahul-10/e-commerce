const { db } = require('../../configs/db');

exports.getAttributeById = id => db('attributes').select(['*']).where({ id });