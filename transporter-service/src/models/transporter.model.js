const mongoose = require('mongoose')

const transportSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'ObjectID of Transporter is required']
    },
    name: {
        type: String,
        validate: {
            validator: (description) => description.length > 0,
            message: 'Transporter name value null.'
        },
        required: [true, 'Name of Transporter is required']
    },
    active: {
        type: Boolean,
        default: true,
        required: [true, "Transporter must have an active value (true/false)."]
    },
}, { versionKey: false })

module.exports = mongoose.model('Transporter', transportSchema)