const amqp = require('amqplib/callback_api');
const Message = require('./message')

module.exports = {
    publishMsg(type, message) {
        // Connects to the RabbitMQ server
        amqp.connect('amqp://rabbitmq:5672', function(err, conn) {
            if (err){
                console.log("Could not connect to RabbitMQ server")
            }
            
            // Creates a channel to communicatie through
            conn.createChannel(function(err, channel) {
                if (err){
                    console.log("Could not create RabbitMQ channel")
                }
                let queue = 'catalog-service-queue'
                
                // Checks if a queue exists, if it doesn't it will be created
                channel.assertQueue(queue, {
                    durable: false
                });

                // Sends the message to the queue
                channel.sendToQueue(queue, Buffer.from(JSON.stringify(new Message(type, message))));
                console.log("Succesfully pushed message to the RabbitMQ queue")
            })
            // Closes the connection to the RabbitMQ server
            setTimeout(function() { 
                conn.close(); 
            }, 500);
        });  
    }
}
