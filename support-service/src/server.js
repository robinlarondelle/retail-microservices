//Get the correct environmnent variables
if (process.env.NODE_ENV == "development") require('dotenv').config({ path: "../env/dev.env" }) 
else require('dotenv').config({ path: "./environment/prod.env" })

//dependencies imports
const express = require('express')
const morgan = require("morgan") //HTTP request logger
const bodyParser = require('body-parser') //Pase request body to JSON
const cors = require("cors") // Access control
const mongoose = require('mongoose')

//properties setup
const app = express()
app.use(bodyParser.json()) //Parse request body to JSON
app.use(cors('*'))
if (process.env.NODE_ENV == "development") app.use(morgan("dev")) //dont show all logs when in production mode
const port = process.env.PORT || "7000"
const dbConfig = require(process.env.DATABASE_CONFIG_LOCATION || "../../database_config.json")

let databaseString;
if (process.env.DOCKER) databaseString = `${dbConfig.baseUrl}${dbConfig.supportServiceDatabase}`
else databaseString = `${dbConfig.localhostUrl}${dbConfig.supportServiceDatabase}`

//MongoDB database connection
mongoose.connect(databaseString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('successfully connected to the database'))
.catch(err => {
  console.log('error connecting to the database')
  console.log(err);

  //Kill the service on error
  process.exit()
})

const supportTicketRoute = require("./routes/support.route")

app.use("/support", supportTicketRoute)


//Catch all non existing endpoints
app.use("*", function (req, res, next) {
  next(new ErrorMessage("EndpointNotFoundError", "Endpoint not found", 404))
})

//Error middleware
app.use((err, req, res, next) => {
  res.status(err.code || 404).json(err).send();
})

//Setup server on designated port
app.listen(port, () => console.log("Server is running on port: " + port + "\n"))