const { getList, getVariantDetail } = require('../controller/product');
module.exports = (router) => {
  router.get('/list', getList);
  
  router.get('/details/:id', getVariantDetail);
  
}
