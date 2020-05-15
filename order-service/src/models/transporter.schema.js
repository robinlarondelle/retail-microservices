const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transporterSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'ObjectID is required']
    },
    name: {
        type: String,
        required: [false, 'Name is required.']
    }
}, { versionKey: false });

module.exports = mongoose.model('Transporter', transporterSchema);