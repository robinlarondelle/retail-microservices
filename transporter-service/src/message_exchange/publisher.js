const amqp = require('amqplib/callback_api');
let messageQueue = Array()

module.exports = {
    publishMsg(key, message) {
        // Connects to the RabbitMQ server
        amqp.connect('amqp://rabbitmq:5672', function(err, conn) {
            if (err){
                console.log("Could not connect to RabbitMQ server")
            } else {
                // Creates a channel to communicatie through
                conn.createChannel(function(err, channel) {
                    if (err){
                        console.log("Could not create RabbitMQ channel")
                    } else {
                        let exchange = 'default'

                        // Checks if the exchange 'default' exists, otherwise creates a new exchange of type 'topic'
                        channel.assertExchange(exchange, 'topic', {
                            // The exchange will survive a broker restart
                            durable: true
                        })

                        // Publishes the message to the exchange
                        channel.publish(exchange, key, Buffer.from(JSON.stringify(message)))
                    }
                })

                // Closes the connection to the RabbitMQ server
                setTimeout(function() {
                    conn.close();
                }, 500);
            }
        });
    }
}
