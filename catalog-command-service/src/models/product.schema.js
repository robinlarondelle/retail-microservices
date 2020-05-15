const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
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
    },
    description: {
        type: String, 
        validate: {
            validator: (description) => description.length > 0,
            message: 'Description must be longer than 0 characters'
        },
        required: [true, 'Description is required']
    },
    price: {
        type: Number,
        validate: {
            validator: (price) => price >= 0,
            message: 'Price must be equal to or greater than zero'
        },
        required: [true, "Price is required"]
    },
    tpv: {
        type: mongoose.Schema.Types.ObjectId,
        required: false
    }
}, { versionKey: false })

module.exports = mongoose.model('Product', productSchema)