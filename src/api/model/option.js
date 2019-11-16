const { db } = require('../../configs/db');

exports.getOptionById = id => db('options').select(['*']).where({ id });

exports.getOptinsByIds = ids => db('options').select(['*']).whereIn('id', ids);