const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transporter = mongoose.model("transporter", new Schema({
    name: {
        name: String,
        required: true
    }
}))

module.exports = transporter