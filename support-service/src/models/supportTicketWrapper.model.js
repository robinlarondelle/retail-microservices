const mongoose = require('mongoose')
const Schema = mongoose.Schema
const SupportTicketEvent = require('./supportTicketEvent.model')

const supportTicketWrapperSchema = new Schema({
    supportTicketID: Schema.Types.ObjectId,
    createdBy: String,
    data: [SupportTicketEvent],
    author: String,
},
    { timestamps: true }
)

module.exports = mongoose.model("supportTicketWrapper", supportTicketWrapperSchema)