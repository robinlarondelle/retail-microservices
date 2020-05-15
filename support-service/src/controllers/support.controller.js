const Error = require('../models/error.model')
const mongoose = require('mongoose')
const SupportTicketWrapper = mongoose.model('supportTicketWrapper')
const SupportTicketEvent = mongoose.model('supportTicketEvent')
const SupportTicket = mongoose.model('supportTicket')
const events = require("../utils/events")
const publisher = require("../utils/publisher")

const buildObject = events => {
    let returnObject = {}

    events.forEach(x => {
        Object.keys(x.data).forEach(y => {
            if (y !== "_id") returnObject[y] = x.data[y]
        })
    })

    return returnObject
}


module.exports = {
    getAllSupportTickets(req, res, next) {
        SupportTicketWrapper.find({}).then(result => {
            res.status(200).json(result).end()
        })
    },

    getSupportTicketById(req, res, next) {
        SupportTicketWrapper
            .find({ supportTicketID: req.params.id })
            .sort('-createdAt')
            .exec((err, events) => {
                if (err) next(new Error(err, 500))
                else if (events.length > 0) {
                    let newObject = buildObject(events[0].toObject().events)

                    const response = {
                        object: newObject,
                        supportTicketID: events[0].supportTicketID,
                        creator: events[0].author,
                        title: events[0].title,
                        createdAt: events[0].createdAt,
                        lastUpdatedBy: events[events.length - 1].author,
                        history: []
                    }
                    events[0].toObject().events.forEach(x => response.history.push(x))

                    res.status(200).json(response).end()
                } else res.status(404).json(new Error(`No Support Tickets with ID ${req.params.id} found.`))
            })
    },

    createSupportTicket(req, res, next) {
        SupportTicketWrapper.find({}).then(x => x.map(x => x.remove()))

        const supportTicket = new SupportTicket(req.body)
        new SupportTicketWrapper({
            supportTicketID: supportTicket._id,
            events: new SupportTicketEvent({
                event: events.createdEvent,
                author: supportTicket.creator,
                data: supportTicket
            })
        })
            .save()
            .then(supportTickets => {
                publisher.publishMsg("support.created", supportTickets)
                res.status(200).json(supportTickets).end()
            })
    },

    updateSupportTicketById(req, res, next) {
        const id = req.params.id

        SupportTicketWrapper.find({ supportTicketID: id }).then(supportTicket => {
            if (supportTicket.length != 0) {
                supportTicket = supportTicket[0]
                const supportTicketEvent = new SupportTicketEvent(req.body)
                supportTicketEvent.event = events.updatedEvent
                supportTicket.events.push(supportTicketEvent)
                supportTicket.save().then(ticket => {
                    publisher.publishMsg("support.updated", supportTicketEvent)
                    res.status(200).json(supportTicketEvent).end()
                }).catch(err => next(new Error("An Error occured.", 500)))
            } else res.status(404).json(new Error(`No Support Ticket found with supportTicketID ${id}. Create a new Support Ticket first`))
        })
    },

    deleteSupportTicketById(req, res, next) {
        const id = req.params.id

        SupportTicketWrapper.find({ supportTicketID: id }).then(supportTicket => {
            if (supportTicket.length != 0) {
                supportTicket = supportTicket[0]
                const supportTicketEvent = new SupportTicketEvent(req.body)
                supportTicketEvent.event = events.closedEvent
                supportTicket.events.push(supportTicketEvent)
                supportTicket.save().then(ticket => {
                    publisher.publishMsg("support.closed", supportTicketEvent)
                    res.status(200).json(supportTicketEvent).end()
                }).catch(err => next(new Error("An Error occured.", 500)))
            } else res.status(404).json(new Error(`No Support Ticket found with supportTicketID ${id}. Create a new Support Ticket first`))
        })
    }
}

