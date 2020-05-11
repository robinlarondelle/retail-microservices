let express = require('express');
let routes = express.Router();
let orderController = require('../controllers/order.controller');

routes.get('/order', orderController.getOrders);
routes.post('/order', orderController.postOrder);
routes.get('/order/:id', orderController.getOrder);
routes.put('/order/:id', orderController.updateOrder);

module.exports = routes;
