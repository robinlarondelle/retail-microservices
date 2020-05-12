const Error = require('./models/error.model')
const Transporter = require('./models/transporter.model')

module.exports = {
    // Create a new transporter
    create(req, res, next) {
        const name = req.body.name
        if (name != null) {
            Transporter.findOne({name}).then(result => {
                if (!result) {
                    Transporter.create({name}).then(result => {
                        res.status(200).json(result).end()
                    }).catch(err => res.status(400).json(new Error(400, "Error creating new Transporter: " + err)).end())
                } else {
                    res.status(400).json(new Error(400, "Transporter already exists.")).end()
                }
            }).catch(err => res.status(400).json(new Error(400, err)).end())
        } else res.status(409).json(new Error(409, "Transporter name not found in body."))
    },
    // Gets all transporters
    getAll(req, res, next) {
        Transporter.find({})
            .then(result => res.status(200).json(result).end())
    },
    // Gets one specific transporter with the given ID
    getById(req, res, next) {
        Transporter.find({id: req.params.id}).then(result => {
            if (result) {
                res.status(200).json(result).end()
            }
            else {
                res.status(404).json(new Error(404, "No matching Transporter ID."))
            }
        })
    },
    // Removes the transporter from the database
    delete(req, res, next) {
        const id = req.params.id
        if (id) {
            Transporter.delete({id})
                .then(result => res.status(200).json(result).end())
                .catch(err => res.status(400).json(new Error(400, "Error deleting Transporter: " + err)).end())
        } else res.status(409).json(new Error(409, "No Transporter ID found in URL.")).end()
    }
}