const Error = require('../models/error.model');
const Transporter = require('../models/transporter.model');
const mongoose = require('mongoose');
const publisher = require('../message_exchange/publisher');

module.exports = {
    // Creates a transporter
    create(req, res, next) {
        console.log("Create Transporter called.");
        const newTransporter = new Transporter({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name
        });
        newTransporter.save().then(result => {
            // Message exchange: Create
            publisher.publishMsg("transporter.created", result);
            res.status(200).json(result)
        }).catch(err => {
            next(new ApiError("Error saving new transporter entry to database: " + err, 409))
        })
    },
    // Gets all transporters
    getAll(req, res, next) {
        Transporter.find()
            .then(result => {
                publisher.publishMsg("transporter.getAll", result);
                res.status(200).json(result)})
    },
    // Gets one specific transporter with the given ID
    getById(req, res, next) {
        Transporter.findOne({_id: req.params.id}).then(result => {
            publisher.publishMsg("transporter.get", result);
            res.status(200).json(result)
        }).catch(err => {
            next(new ApiError("The transporter you are looking for does not exist in the Transporter database.", 404))
        })
    },
    // Sets the transporter status to inactive in the database
    delete(req, res, next) {
        Transporter.findOneAndUpdate({_id: req.params.id}, {active: false}).then(result => {
            // New query for updated active value of false.
            Transporter.findOne({_id: req.params.id}).then(result => {
                // Message exchange: Delete
                publisher.publishMsg("transporter.deleted", result);
                res.status(200).json(result)
            }).catch(err => {
                next(new ApiError("The transporter you are looking for does not exist in the Transporter database.", 404));
            })
        }).catch(err => {
            next(new ApiError("The transporter you are trying to delete does not exist in the Transporter database.", 404));
        })
    }
};