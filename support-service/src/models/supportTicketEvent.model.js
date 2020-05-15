const mongoose = require('mongoose')
const SupportTicket = require('./supportTicket.model')

const supportTicketEventsSchema = mongoose.Schema({
    event: String,
    author: String,
    comment: String,
    data: SupportTicket.schema,
},
    { timestamps: true }
)

module.exports = mongoose.model("supportTicketEvent", supportTicketEventsSchema)