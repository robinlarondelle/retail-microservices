let express = require('express');
let routes = express.Router();
let catalogController = require('../controllers/catalog.controller');
let tpvController = require('../controllers/tpv.controller');

routes.get('/catalog/tpv', tpvController.getTpv);
routes.post('/catalog/tpv', tpvController.postTpv)
routes.get('/catalog/tpv/:id', tpvController.getOneTpv);
routes.delete('/catalog/tpv/:id', tpvController.deleteTpv);

routes.get('/catalog', catalogController.getProducts)
routes.post('/catalog', catalogController.postProduct);
routes.get('/catalog/:id', catalogController.getOneProduct);
routes.delete('/catalog/:id', catalogController.deleteProduct);

module.exports = routes;