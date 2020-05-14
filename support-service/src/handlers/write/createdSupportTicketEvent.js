const mongoose = require('mongoose')
const Schema = mongoose.Schema

const supportTicket = mongoose.model("supportTicket", new Schema({
    event: {type: String},
    supportTicketID: {type: ObjectId},
    data: {type: Schema.Types.Mixed},
    timestamp: {
        type: Schema.Types.Date,
        default: new Date()
    }
}))

//bind the ID to the supportTicket so it can be updated in the future
supportTicket.virtual('supportTicketID').get(function() {
    return this._id;
})

module.exports = mongoose.model("supportTicket", supportTicketSchema)