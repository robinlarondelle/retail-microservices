const mongoose = require('mongoose')
const Schema = mongoose.Schema
const SupportTicketEvent = require('./supportTicketEvent.model')
delete mongoose.connection.models['supportTicketWrapper'];
const supportTicketWrapperSchema = new Schema({
    supportTicketID: Schema.Types.ObjectId,
    events: [SupportTicketEvent.schema],
},
    { timestamps: false }
)

module.exports = mongoose.model("supportTicketWrapper", supportTicketWrapperSchema)