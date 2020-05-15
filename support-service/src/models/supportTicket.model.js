const mongoose = require('mongoose')
const Schema = mongoose.Schema

const supportTicketSchema = new Schema({
    subject: String,
    creator: String,
    email: String,
    status: String,
    message: String
})
module.exports = mongoose.model("supportTicket", supportTicketSchema)