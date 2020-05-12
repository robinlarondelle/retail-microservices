//Get the correct environmnent variables
if (process.env.NODE_ENV == "development"){
  require('dotenv').config({ path: "../env/dev.env" }) 
} else {
  require('dotenv').config({ path: "./environment/prod.env" })
}

const mong = require('mongoose')
const express = require('express')
const morgan = require("morgan") //HTTP request logger
const bodyParser = require('body-parser') //Pase request body to JSON
const cors = require("cors") // Access control

// Config
const app = express()
app.use(cors('*'))
const port = process.env.PORT || "3000"
app.use(bodyParser.json()) //Parse request body to JSON
if (process.env.NODE_ENV == "development") app.use(morgan("dev")) //dont show all logs when in production mode
let url;
if (process.env.DOCKER) url = `${dbConfig.baseUrl}${dbConfig.transporterServiceDatabase}`
else url = `${dbConfig.localhostUrl}${dbConfig.transporterServiceDatabase}`

// Mongo
mong.connect(url, {}, (err, db) => {
  if (err) {
    logger.warn(`Error connecting to Transporter database. ${err.stack}`)
  }}).then(() => console.log('Transporter database connection established.'))
    .catch(err => {
      console.log("Error connecting to Transporter database: " + err)
      process.exit()
    });

// Routes
const transportRoute = require("./routes/support.route")
app.use(cors('*'))
app.use("/transporter", transportRoute)

// Catch all non existing endpoints
app.use("*", function (req, res, next) {
  next(new ErrorMessage("EndpointNotFoundError", "Endpoint not found", 404))
})

// Error middleware
app.use((err, req, res, next) => {
  res.status(err.status || 404).json(err).send();
})

// Setup server on designated port
app.listen(port, () => console.log("Server is running on port: " + port + "\n"))