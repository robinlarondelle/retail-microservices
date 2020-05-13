const ApiError = require('../models/error.model')

module.exports = {

    //CRUD Order

    /**
     * @param {*} req The incoming request.
     * @param {*} res The resource.
     * @param {*} next ApiError when id is invalid.
     */

    getOrders(req, res, next) {
        res.status(200).json({ "test": "success" }).end();
    },

    /**
     * @param {*} req The incoming request.
     * @param {*} res The resource.
     * @param {*} next ApiError when id is invalid.
     */

    postOrder(req, res, next) {

    },

    /**
     * @param {*} req The incoming request.
     * @param {*} res The resource.
     * @param {*} next ApiError when id is invalid.
     */

    getOrder(req, res, next) {

    },

    /**
     * @param {*} req The incoming request.
     * @param {*} res The resource.
     * @param {*} next ApiError when id is invalid.
     */

    updateOrder(req, res, next) {

    },

}