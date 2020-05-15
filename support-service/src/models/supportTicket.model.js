const mongoose = require('mongoose')
const Schema = mongoose.Schema
delete mongoose.connection.models['supportTicket'];

const supportTicketSchema = new Schema({
    subject: String,
    creator: String,
    email: String,
    status: String,
    message: String
},
    { timestamps: false }
)
module.exports = mongoose.model("supportTicket", supportTicketSchema)