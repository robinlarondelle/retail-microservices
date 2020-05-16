const express = require('express')
const morgan = require("morgan") //HTTP request logger
const bodyParser = require('body-parser') //Pase request body to JSON
const cors = require("cors") // Access control
const mongoose = require('mongoose')
const ApiError = require('./models/error.model')
const RabbitMQ = require('./rabbitmqHandler')

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

RabbitMQ.openConnection();

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