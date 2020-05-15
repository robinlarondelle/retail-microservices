const mongoose = require('mongoose')

const supportTicketSchema = mongoose.Schema({
    subject: String,
    creator: String,
    email: String,
    status: String,
    message: String
},
    { timestamps: false }
)
module.exports = mongoose.model("supportTicket", supportTicketSchema)