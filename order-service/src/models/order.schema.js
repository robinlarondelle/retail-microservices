const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Transporter = require('./transporter.schema')
const Product = require('./product.schema')

const orderSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'ObjectID is required']
    },
    shipped: {
        type: Boolean,
        required: [true, 'Shipped is required.']
    },
    name: {
        type: String,
        validate: {
            validator: (name) => name.length > 5,
            message: 'Name must be longer than 5 characters.'
        },
        required: [true, 'Name is required.']
    },
    street: {
        type: String,
        validate: {
            validator: (street) => street.length > 8,
            message: 'Street must be longer than 5 characters.'
        },
        required: [true, 'Street is required.']
    },
    number: {
        type: String,
        required: [true, 'Number is required.']
    },
    city: {
        type: String,
        validate: {
            validator: (city) => city.length > 5,
            message: 'City must be longer than 5 characters.'
        },
        required: [true, 'City is required.']
    },
    state: {
        type: String,
        validate: {
            validator: (state) => state.length > 5,
            message: 'State must be longer than 5 characters.'
        },
        required: [true, 'State is required.']
    },
    country: {
        type: String,
        validate: {
            validator: (country) => country.length > 5,
            message: 'Country must be longer than 5 characters.'
        },
        required: [true, 'Country is required.']
    },
    email: {
        type: String,
        validate: {
            validator: (email) => email.length > 5,
            message: 'E-mail must be longer than 5 characters.'
        },
        required: [true, 'E-mail is required.']
    },
    phone: {
        type: Number,
        validate: {
            validator: (phone) => phone >= 8,
            message: 'Phone number must be longer than 5 characters.'
        },
        required: [true, 'Phone number is required.']
    },
    transporter: {
        type: Transporter.schema,
        ref: 'transporter',
        required: [false, 'Transporter is required.']
    },
    products: [Product.schema],
}, { versionKey: false });

module.exports = mongoose.model('Order', orderSchema)