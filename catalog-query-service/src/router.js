let express = require('express');
let routes = express.Router();
let catalogController = require('./controllers/catalog.controller');
let tpvController = require('./controllers/tpv.controller');

routes.get('/catalog/tpv', tpvController.getTpv);
routes.get('/catalog/tpv/:id', tpvController.getOneTpv);

routes.get('/catalog', catalogController.getProducts)
routes.get('/catalog/:id', catalogController.getOneProduct);

module.exports = routes;