const mongoose = require('mongoose');

const tpvSchema = mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId},
    name: {type: String, required: true}
}, { versionKey: false })

module.exports = mongoose.model('Tpv', tpvSchema)