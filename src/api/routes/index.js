const router = require('express-promise-router')();

require('./product')(router);
require('./internal')(router);

module.exports = router;
