const mongoose = require('mongoose')
const Schema = mongoose.Schema

const supportTicketSchema = new Schema({
    event: String,
    data: Schema.Types.Mixed,
    supportTicketID: Schema.Types.ObjectId,
    author: String,
    // timestamp: {
    //     type: Schema.Types.Date,
    //     default: new Date()
    // }
},
    { timestamps: true }
)

module.exports = mongoose.model("supportTicket", supportTicketSchema)