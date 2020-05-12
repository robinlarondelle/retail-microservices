const mongoose = require('mongoose')
const Schema = mongoose.Schema

const supportTicket = mongoose.model("supportTicket", new Schema({
    name: {
        type: String,
        required: true
    },
    responses: [{
        content: String,
        timestamp: {
            type: Date,
            default: new Date()
        }
    }]
}))

module.exports = supportTicket