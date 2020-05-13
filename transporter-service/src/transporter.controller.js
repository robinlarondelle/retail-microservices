const Error = require('./models/error.model')
const Transporter = require('./models/transporter.model')

module.exports = {
    // Create a new transporter
    create(req, res, next) {
        const name = req.body.name
        if (name != null) {
            Transporter.findOne({name:name}).then(result => {
                if (!result) {
                    Transporter.create({name:name}).then(result => {
                        res.status(200).json(result).end()
                    }).catch(err => res.status(400).json(new Error("Error creating new Transporter: " + err, 400)).end())
                } else {
                    res.status(400).json(new Error("Transporter already exists: " + err, 400)).end()
                }
            }).catch(err => res.status(400).json(new Error( err,400)).end())
        } else res.status(409).json(new Error("Transporter name not found in body.",409)).end()
    },
    // Gets all transporters
    getAll(req, res, next) {
        Transporter.find()
            .then(result => res.status(200).json(result).end())
    },
    // Gets one specific transporter with the given ID
    getById(req, res, next) {
        Transporter.find({id: req.params.id}).then(result => {
            if (result) {
                res.status(200).json(result).end()
            }
            else {
                res.status(404).json(new Error("No matching Transporter ID.",404)).end()
            }
        })
    },
    // Removes the transporter from the database
    delete(req, res, next) {
        const id = req.params.id
        if (id) {
            Transporter.delete({id})
                .then(result => res.status(200).json(result).end())
                .catch(err => res.status(400).json(new Error( "Error deleting Transporter: " + err,400)).end())
        } else res.status(409).json(new Error("No Transporter ID found in URL.",409)).end()
    }
}