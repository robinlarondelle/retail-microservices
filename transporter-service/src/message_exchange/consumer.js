const Transporter = require('../models/transporter.model');
const publisher = require('../message_exchange/publisher');

module.exports = {
    consumeMsg(message, acknowledge) {
        let content = JSON.parse(message.content.toString())
        let key = message.fields.routingKey   
        switch (key) {
            case "order.created":
            console.log("Detected order placement. Providing suitable Transporter for Order ID " + content._id + "..")
            // Randomizer
            // Get the count of all Transporters
            Transporter.countDocuments().exec(function (err, count) {
                // Get a random entry
                let random = Math.floor(Math.random() * count)
                // Again query all users but only fetch one offset by our random #
                Transporter.findOne({active:true}).skip(random).exec(
                    function (err, res, next) {
                        //Return new message
                        publisher.publishMsg("transporter.assigned", {"order_id" : content._id, "transporter_id": res._id});
                        acknowledge()
                    }
                )
            break;
            })
        }
    }
}
