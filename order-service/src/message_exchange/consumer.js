const mongoose = require("mongoose");
const Order = require("../models/order.schema");
const Product = require("../models/product.schema");
const Transporter = require("../models/transporter.schema");
module.exports = {
  consumeMsg(message, acknowledge) {
    let key = message.fields.routingKey;
    let content = JSON.parse(message.content.toString());
    switch (key) {
      case "catalog.product.created":
        const product = new Product({
          _id: content._id,
          name: content.name,
        });

        product.save().then((result) => acknowledge());

        break;
      case "catalog.product.deleted":
        Product.findByIdAndDelete({ _id: content._id }).then((result) =>
          acknowledge()
        );

        break;

      case "transporter.created":
        const transporter = new Transporter({
          _id: content._id,
          name: content.name,
        });

        transporter.save().then((result) => acknowledge());

        break;
      case "transporter.deleted":
        Transporter.findByIdAndDelete({ _id: content._id }).then((result) =>
          acknowledge()
        );

        break;
      case "transporter.assigned":
        let transporterId = content.transporter_id;
        let orderId = content.order_id;

        Order.findByIdAndUpdate(
          { _id: content._id },
          { transporter: Transporter.findOne({ _id: transporterId }) }
        ).then((result) => acknowledge());

        break;
    }
  },
};
