const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    amount: {
        type: Integer,
        required: [true, 'Name is required.']
    }
});

module.exports = ProductSchema;