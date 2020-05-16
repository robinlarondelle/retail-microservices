const ApiError = require('../models/error.model')
const ThirdPartyVendor = require('../models/tpv.schema')
const Product = require('../models/product.schema')
const mongoose = require('mongoose');
const publisher = require('../message_exchange/publisher')

module.exports = {
    postTpv(req, res, next) {
        const tpv = new ThirdPartyVendor({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name
        })

        tpv.save().then(result => {
            publisher.publishMsg("catalog.tpv.created", result)
            res.status(200).json(result).end();
        }).catch(err => {
            next(new ApiError("Whoops, an unexpected error occurred: " + err.message, 500));
        })
    },

    deleteTpv(req, res, next) {
        ThirdPartyVendor.findOneAndDelete({_id: req.params.id}).then(result => {
            Product.updateMany({tpv: req.params.id}, {active: false}).then(r => {
                publisher.publishMsg("catalog.tpv.deleted", result)
                res.status(200).json(result).end();
            }).catch(err => {
                next(new ApiError("Something went wrong while deactivating the related products", 404));
            })
        }).catch(err => {
            next(new ApiError("The third party vendor you are trying to delete does not exist", 404));
        })
    }
}