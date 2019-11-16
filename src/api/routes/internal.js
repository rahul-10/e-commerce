const { addVariant } = require('../controller/internal');
const { isValid } = require('../utils/validation')

module.exports = (router) => {
  // for internal use only
  router.post('/internal/add/variant', (req, res) => {
    isValid(req.body);
    return addVariant(req, res);
  })
}