const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [false, 'ObjectID is required']
    },
    name: {
        type: String,
        required: [false, 'Name is required']
    },
    amount: {
        type: Number,
        required: [false, 'Amount is required.']
    }
}, { versionKey: false });

module.exports = mongoose.model('Product', productSchema);