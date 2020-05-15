const Order = require('../models/order.schema');
const publisher = require('../message_exchange/publisher');

module.exports = {
    consumeMsg(message) {
        let content = JSON.parse(message.content.toString())
        let key = message.fields.routingKey

        console.log("RabbitMQ message received with key: " + key)
        console.log("Message contains: " + message.content.toString())
        if(key === "transporter.assigned"){
            console.log("Detected Transporter assigned to order: ")

            // Logica om Transporter toe te voegen aan Order

        }
    }
}
