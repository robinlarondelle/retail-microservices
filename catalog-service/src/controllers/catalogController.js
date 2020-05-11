const ApiError = require('../models/error.model')

module.exports = {
    getProducts(req, res, next) {
        res.status(200).json({ "test": "success" }).end();
    },

    postProduct(req, res, next) {

    },

    getOneProduct(req, res, next) {

    },

    deleteProduct(req, res, next) {

    }
}