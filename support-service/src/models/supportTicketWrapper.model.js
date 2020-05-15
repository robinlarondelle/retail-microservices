const mongoose = require('mongoose')
const SupportTicketEvent = require('./supportTicketEvent.model')
const supportTicketWrapperSchema = mongoose.Schema({
    supportTicketID: mongoose.Schema.Types.ObjectId,
    events: [SupportTicketEvent.schema],
},
    { timestamps: false }
)

module.exports = mongoose.model("supportTicketWrapper", supportTicketWrapperSchema)