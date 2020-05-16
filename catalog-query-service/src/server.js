const express = require('express')
const morgan = require("morgan") //HTTP request logger
const bodyParser = require('body-parser') //Pase request body to JSON
const cors = require("cors") // Access control
const ApiError = require('./models/error.model')
const RabbitMQ = require('./rabbitmqHandler')

const app = express()

//Get the correct environmnent variables
if (process.env.NODE_ENV == "development"){
  require('dotenv').config({ path: "../env/dev.env" }) 
} else {
  require('dotenv').config({ path: "./environment/prod.env" })
}

//Starts polling the RabbitMQ server
RabbitMQ.openConnection();

app.use(bodyParser.json()) //Parse request body to JSON
if (process.env.NODE_ENV == "development") app.use(morgan("dev")) //dont show all logs when in production mode
app.use(cors('*'))

// Routes all calls through the router
const router = require('./routes/router')
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
const port = process.env.PORT || "6000"
app.listen(port, () => console.log(`Server is running on port: ${port}`))