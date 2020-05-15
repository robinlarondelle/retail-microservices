const mongoose = require('mongoose')
const Schema = mongoose.Schema
const SupportTicket = require('./supportTicket.model')
delete mongoose.connection.models['supportTicketEvent'];

const supportTicketEventsSchema = new Schema({
    event: String,
    author: String,
    comment: String,
    data: SupportTicket.schema,
},
    { timestamps: true }
)

module.exports = mongoose.model("supportTicketEvent", supportTicketEventsSchema)