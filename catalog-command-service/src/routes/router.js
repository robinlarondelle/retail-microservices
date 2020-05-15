let express = require('express');
let routes = express.Router();
let catalogController = require('../controllers/catalog.controller');
let tpvController = require('../controllers/tpv.controller');

routes.post('/catalog/tpv', tpvController.postTpv)
routes.delete('/catalog/tpv/:id', tpvController.deleteTpv);

routes.post('/catalog', catalogController.postProduct);
routes.delete('/catalog/:id', catalogController.deleteProduct);

module.exports = routes;