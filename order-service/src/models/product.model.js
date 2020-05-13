const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'ObjectID is required']
    },
    amount: {
        type: Integer,
        required: [true, 'Name is required.']
    }
});

module.exports = ProductSchema;