const Error = require('../models/error.model')
const SupportTicket = require('../models/supportTicket.model')

module.exports = {
    getAllSupportTickets(req, res, next) {
        SupportTicket.find({})
            .then(supportTickets => res.status(200).json(supportTickets).end())
    },

    getSupportTicketById(req, res, next) {
        SupportTicket.find({id: req.params.id}).then(supportTicket => {
            if (supportTicket) res.status(200).json(supportTicket).end()
            else res.status(404).json(new Error(404, "The support ticket could not be found"))
        })
    },

    createSupportTicket(req, res, next) {
        const name = req.body.name
        const content = req.body.content

        if (name && content) {
            SupportTicket.findOne({name}).then(person => {
                if (person) {
                    SupportTicket.update({id: person.id}, {$push: {responses: {content}}}).then(updatedTicket => {
                        res.status(200).json(updatedTicket).end()
                    })
                    .catch(err => res.status(400).json(new Error(400, err)).end())
                } else {
                    SupportTicket.create({name, responses: [{content: content}]}).then(supportTicket => {
                        res.status(200).json(supportTicket).end()
                    })
                    .catch(err => res.status(400).json(new Error(400, err)).end())
                }
            }).catch(err => res.status(400).json(new Error(400, err)).end())
        } else res.status(409).json(new Error(409, "The body provided was not valid, therefore the support ticket could not be made"))
    },

    updateSupportTicketById(req, res, next) {
        console.log("reached update");
        
        const id = req.params.id
        const content = req.body.content
        console.log(id);
        console.log(content);
        console.log(id && content);
        

        if (id && content) {
            SupportTicket.updateOne({id}, {content})
                .then(updatedTicket => res.status(200).json(updatedTicket).end())
                .catch(err => res.status(404).json(new Error(400, "The support ticket could not be found")).end())
        } else res.status(409).json(new Error(409, "The body provided was not valid, therefore the reply could not be made")).end()
    }
}