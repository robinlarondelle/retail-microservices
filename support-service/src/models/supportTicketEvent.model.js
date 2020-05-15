const mongoose = require('mongoose')
const Schema = mongoose.Schema
const SupportTicket = require('./supportTicket.model')

const supportTicketEventsSchema = new Schema({
    event: String,
    author: String,
    comment: String,
    data: [SupportTicket],
    createdBy: String
},
    { timestamps: true }
)

module.exports = mongoose.model("supportTicket", supportTicketEventsSchema)