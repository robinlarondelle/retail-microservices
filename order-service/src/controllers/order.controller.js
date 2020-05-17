const ApiError = require("../models/error.model");
const Order = require("../models/order.schema");
const Product = require("../models/product.schema");
const Transporter = require("../models/transporter.schema");
const mongoose = require("mongoose");
const publisher = require('../message_exchange/publisher');

// Helper for checking for existing product.
function productExists(id, callback) {
  Product.findOne({ _id: id }).then((product) => {
    if (product !== null) {
      callback(true);
    } else {
      callback(false);
    }
  });
}

module.exports = {
  /**
   * @param {*} req The incoming request.
   * @param {*} res The resource.
   * @param {*} next ApiError when id is invalid.
   */

  getOrders(req, res, next) {
    Order.find({}).then(order => {
      res.status(200).json(order).end()
    })
      .catch((err) => {
        next(
          new ApiError(
            `Whoops, an unexpected error occurred: ${err.message}`,
            500
          )
        );
      });
  },

  /**
   * @param {*} req The incoming request.
   * @param {*} res The resource.
   * @param {*} next ApiError when id is invalid.
   */

  postOrder(req, res, next) {
    Transporter.findOne({ _id: req.body.transporter._id })
      .populate({ path: "transporter", model: "Transporter" })
      .then((result) => {

        let ids = []
        req.body.products.forEach(p => ids.push(p._id))

        Product.find({
          '_id': {
            $in: ids
          }
        }).then(productRes => {

          let productAmounts = []
          req.body.products.forEach(reqProd => {
            productRes.forEach(prod => {
              if (prod._id == reqProd._id) {
                productAmounts.push({
                  _id: prod._id,
                  name: prod.name,
                  amount: reqProd.amount
                })
              }
            })
          })

          const order = new Order({
            _id: new mongoose.Types.ObjectId(),
            shipped: req.body.shipped,
            name: req.body.name,
            street: req.body.street,
            number: req.body.number,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            email: req.body.email,
            phone: req.body.phone,
            transporter: result,
            products: productAmounts
          })

          order
            .save()
            .then((result) => {
              Order.findOne({ _id: result._id })
                .then((order) => res.send(order))
                .catch(next);
            })
            .catch((err) => {
              next(
                new ApiError(
                  `Whoops, an unexpected error occurred: ${err.message}`,
                  500
                )
              );
            });
        })
      });
  },

  /**
   * @param {*} req The incoming request.
   * @param {*} res The resource.
   * @param {*} next ApiError when id is invalid.
   */

  getOrder(req, res, next) {
    Order.findOne({ _id: req.params.id })
      .then((result) => {
        res.status(200).json(result).end()
      })
      .catch((err) => {
        next(
          new ApiError("The product you are looking for does not exist", 404)
        );
      });
  },

  /**
   * @param {*} req The incoming request.
   * @param {*} res The resource.
   * @param {*} next ApiError when id is invalid.
   */

  updateOrder(req, res, next) {
    Order.findOneAndUpdate({ _id: req.params.id }, { shipped: req.body.shipped })
      .then(result => {
        if (result == null) next(new ApiError(404, `Order doesn't exist!`))
        else res.status(200).json(result).end()
      })
      .catch((err) => {
        next(new ApiError(`Whoops, an unexpected error occurred: ${err.message}`, 500));
      });
  },
};
