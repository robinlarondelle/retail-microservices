const Error = require('../models/error.model')
const SupportTicketEvent = require('../models/supportTicketEvent.model')
const events = require("../utils/events")
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const buildObject = tickets => {    
    let returnObject = {}
    tickets.forEach(x => {
        Object.keys(x.data).forEach(y => {            
            returnObject[y] = x.data[y]
        })
    })
    return returnObject
}


module.exports = {
    getAllSupportTickets(req, res, next) {
        SupportTicketEvent.find({})
            .then(supportTickets => res.status(200).json(supportTickets).end())
    },

    getSupportTicketById(req, res, next) {
        SupportTicketEvent
            .find({ supportTicketID: req.params.id })
            .sort('-createdAt')
            .exec((err, events) => {
                if (err) next(new Error(err, 500))
                else if (events.length > 0) {  
                    let newObject = buildObject(events)    
                                          
                    const response = {
                        object: newObject,
                        supportTicketID: events[0].supportTicketID,
                        creator: events[0].author,
                        title: events[0].title,
                        lastUpdatedBy: events[events.length - 1].author,
                        history: []
                    }                   

                    //add all tickets to the history
                    events.forEach(x => response.history.push(x))

                    res.status(200).json(response).end()
                } else res.status(404).json(new Error(`No Support Tickets with ID ${req.params.id} found.`))
            })
    },

    createSupportTicket(req, res, next) {
        SupportTicketEvent.find({}).then(x => x.map(x => x.remove()))
        const supportTicketEvent = new SupportTicketEvent({
            event: events.createdEvent,
            data: req.body
        })

        const createSupportTicketObject = supportTicketEvent.toObject()
        createSupportTicketObject.supportTicketID = supportTicketEvent._id
        const createdSupportTicketEvent = new SupportTicketEvent(createSupportTicketObject)

        createdSupportTicketEvent.save().then(ticket => {
            res.status(200).json(ticket).end()
        }).catch(err => next(new Error(err, 500)))
    },

    updateSupportTicketById(req, res, next) {
        const id = req.params.id

        SupportTicketEvent.find({ _id: id }).then(supportTickets => {
            if (supportTickets.length != 0) {
                const supportTicketEvent = new SupportTicketEvent({
                    event: events.updatedEvent,
                    supportTicketID: id,
                    data: req.body.data,
                    author: req.body.author
                })

                supportTicketEvent.save().then(ticket => {
                    res.status(200).json(ticket).end()
                }).catch(err => next(new Error("An Error occured.", 500)))
            } else res.status(404).json(new Error(`No Support Ticket found with supportTicketID ${id}. Create a new Support Ticket first`))
        })
    },

    deleteSupportTicketById(req, res, next) {
        const id = req.params.id

        SupportTicketEvent.find({ _id: id }).then(supportTickets => {
            if (supportTickets.length != 0) {
                const supportTicketEvent = new SupportTicketEvent({
                    event: events.closedEvent,
                    supportTicketID: id,
                    data: req.body.data,
                    author: req.body.author
                })

                supportTicketEvent.save().then(ticket => {
                    res.status(200).json(ticket).end()
                }).catch(err => next(new Error("An Error occured.", 500)))
            } else res.status(404).json(new Error(`No Support Ticket found with supportTicketID ${id}. Create a new Support Ticket first`))
        })
    }
}

