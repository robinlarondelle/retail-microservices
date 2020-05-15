const express = require('express')
const morgan = require("morgan") //HTTP request logger
const bodyParser = require('body-parser') //Pase request body to JSON
const cors = require("cors") // Access control
const mongoose = require('mongoose')
const ApiError = require('./models/error.model')
const amqp = require('amqplib/callback_api')
const consumer = require('./message_exchange/consumer')

const app = express()

//Get the correct environmnent variables
if (process.env.NODE_ENV == "development"){
    require('dotenv').config({ path: "../env/dev.env" })
} else {
    require('dotenv').config({ path: "./environment/prod.env" })
}

const port = process.env.PORT || "5000"
const dbConfig = require(process.env.DATABASE_CONFIG_LOCATION || "../../database_config.json")

let databaseString;
if (process.env.DOCKER) databaseString = `${dbConfig.baseUrl}${dbConfig.transporterServiceDatabase}`
else databaseString = `${dbConfig.localhostUrl}${dbConfig.transporterServiceDatabase}`

//MongoDB database connection
mongoose.connect(databaseString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Successfully connected to the database.'))
    .catch(err => {
        console.log('Error connecting to the database.')
        console.log(err);

        //Kill the service on error
        process.exit()
    })

// Connects to the RabbitMQ server
amqp.connect('amqp://rabbitmq:5672', function(err, conn) {
    if (err){
        console.log("Could not connect to RabbitMQ server.")
    }

    // Creates a channel to communicatie through
    conn.createChannel(function(err, channel) {
        if (err) {
            console.log("Could not create RabbitMQ channel.")
        }

        let exchange = 'default'
        // Listens to created Orders
        let keys = ['*']

        // Checks if the exchange 'default' exists, otherwise creates a new exchange of type 'topic'
        channel.assertExchange(exchange, 'topic', {
            // The exchange will survive a broker restart
            durable: true
        })

        // Checks if the queue 'transporter-service-queue' exists, otherwise creates it
        channel.assertQueue('transporter-service-queue', {
            // The queue will survive a broker restart
            durable: true
        }, function(err, q) {
            if (err) {
                console.log("Could not connect to RabbitMQ queue.")
            }

            // Bind the queue to every key we are listening to
            keys.forEach(function(key) {
                channel.bindQueue(q.queue, exchange, key);
            })

            // Send all incoming messages to the consumer
            channel.consume(q.queue, function(message) {
                consumer.consumeMsg(message)
                channel.ack(message)
            })
        })
    });
});

app.use(bodyParser.json()) //Parse request body to JSON
if (process.env.NODE_ENV == "development") app.use(morgan("dev")) //dont show all logs when in production mode
app.use(cors('*'))

// Routes all calls through the router
const router = require('./routes/transporter.routes')
app.use('/', router)

//Catch all non existing endpoints
app.use("*", function (req, res, next) {
    next(new ApiError("Endpoint not found", 404))
})

//Error middleware
app.use(function(err, req, res, next) {
    res.status(err.code || 500).json(err).send();
})

//Setup server on designated port
app.listen(port, () => console.log(`Server is running on port: ${port}`))