const ApiError = require('../models/error.model')
const Product = require('../models/product.schema')
const mongoose = require('mongoose');
const publisher = require('../message_exchange/publisher')

module.exports = {
    postProduct(req, res, next) {
        const product = new Product({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            description: req.body.description,
            price: req.body.price
        })
        if (req.body.tpv != null) {
            //TODO check if Third party vendor exists
            product.tpv = req.body.tpv
        }

        product.save().then(result => {
            publisher.publishMsg("catalog.product.created", result)
            res.status(200).json(result).end();
        }).catch(err => {
            next(new ApiError("Whoops, an unexpected error occurred: " + err.message, 500));
        })
    },

    deleteProduct(req, res, next) {
        Product.findOneAndDelete({_id: req.params.id}).then(result => {
            if (result == null) next(new ApiError("The product you are trying to delete does not exist", 404));
            else {
                publisher.publishMsg("catalog.product.deleted", result)
                res.status(200).json(result).end();
            }
        }).catch(err => {
            next(new ApiError("Whoops, an unexpected error occurred: " + err.message, 500));
        })
    }
}