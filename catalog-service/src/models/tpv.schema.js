const mongoose = require('mongoose');

const tpvSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'ObjectID is required']
    },
    name: {
        type: String, 
        validate: {
            validator: (name) => name.length > 0,
            message: 'Name must be longer than 0 characters'
        },
        required: [true, 'Name is required']
    }
}, { versionKey: false })

module.exports = mongoose.model('Tpv', tpvSchema)