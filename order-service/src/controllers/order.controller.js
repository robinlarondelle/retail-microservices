const ApiError = require("../models/error.model");
const Order = require("../models/order.schema");
const Product = require("../models/product.schema");
const Transporter = require("../models/transporter.schema");
const mongoose = require("mongoose");
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
    Order.find()
      .populate({ path: "product", model: "Product" })
      .then((order) => res.send(order))
      .catch(next);
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
      }
    )

    for(let element of req.body.products) {
        Product.findOne({ _id: element._id })
        // Why??
        .then(order.products.push(new Product({ _id: element._id, name: "dd" ,amount: element.amount})))
        .then(result => order.products.push(new Product({ _id: element._id, name: result.name ,amount: element.amount})))
    }
    
    order.save()
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
  },

  /**
   * @param {*} req The incoming request.
   * @param {*} res The resource.
   * @param {*} next ApiError when id is invalid.
   */

  getOrder(req, res, next) {
    Order.findOne({ _id: req.params.id })
      .then((result) => {
        res.status(200).json(result).end();
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

  updateOrder(req, res, next) {},
};
