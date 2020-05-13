const ApiError = require('../models/error.model')
const ThirdPartyVendor = require('../models/product.schema')
const mongoose = require('mongoose');

module.exports = {
    getTpv(req, res, next) {
        ThirdPartyVendor.find({}).then(result => {
            res.status(200).json(result).end();
        }).catch(err => {
            next(new ApiError("Whoops, an unexpected error occurred: " + err.message, 500));
        })
    },

    postTpv(req, res, next) {
        const tpv = new ThirdPartyVendor({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name
        })

        tpv.save().then(result => {
            res.status(201).json(result).end();
        }).catch(err => {
            next(new ApiError("Whoops, an unexpected error occurred: " + err.message, 500));
        })
    },

    getOneTpv(req, res, next) {
        ThirdPartyVendor.findOne({_id: req.params.id}).then(result => {
            res.status(200).json(result).end();
        }).catch(err => {
            next(new ApiError("The third party vendor you are looking for does not exist", 404));
        })
    },

    deleteTpv(req, res, next) {
        ThirdPartyVendor.findOneAndDelete({_id: req.params.id}).then(result => {
            res.status(200).json(result).end();
            //TODO Set all products by this TPV to "inactive"
        }).catch(err => {
            next(new ApiError("The third party vendor you are trying to delete does not exist", 404));
        })
    }
}