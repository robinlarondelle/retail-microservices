module.exports = {
    consumeMsg(message) {
        let content = JSON.parse(message.content.toString())
        let key = message.fields.routingKey

        console.log("RabbitMQ message received with key: " + key)
        console.log("Message contains: " + message.content.toString())
    }
}
