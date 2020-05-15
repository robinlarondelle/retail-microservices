const Transporter = require('../models/transporter.model');
const publisher = require('../message_exchange/publisher');

module.exports = {
    consumeMsg(message) {
        let content = JSON.parse(message.content.toString())
        let key = message.fields.routingKey

        console.log("RabbitMQ message received with key: " + key)
        console.log("Message contains: " + message.content.toString())
        if(key === "transporter.created"){
            console.log("Detected order placement. Providing suitable Transporter for Order ID " + content._id + "..")

            // Randomizer
            // Get the count of all Transporters
            Transporter.countDocuments().exec(function (err, count) {

                // Get a random entry
                let random = Math.floor(Math.random() * count)

                // Again query all users but only fetch one offset by our random #
                Transporter.findOne({active:true}).skip(random).exec(
                    function (err, res, next) {
                        // Random Transporter output
                        let arrayToPost = {"OrderId" : content._id, "Transporter": res}
                        // let jsonArray = JSON.parse(arrayToPost.toString());
                        publisher.publishMsg("transporter.assigned", arrayToPost);
                    })
            })
        }
    }
}
