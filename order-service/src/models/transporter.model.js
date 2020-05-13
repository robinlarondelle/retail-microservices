const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransporterSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'ObjectID is required']
    },
    name: {
        type: String,
        validate: {
            validator: (name) => name.length > 5,
            message: 'Name must be longer than 5 characters.'
        },
        required: [true, 'Name is required.']
    }
});

module.exports = TransporterSchema;