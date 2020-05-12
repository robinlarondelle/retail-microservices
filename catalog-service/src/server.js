const express = require('express')
const morgan = require("morgan") //HTTP request logger
const bodyParser = require('body-parser') //Pase request body to JSON
const cors = require("cors") // Access control
const mongoose = require('mongoose')

//Routes require
const router = require('./routes/router')

const app = express()
const port = process.env.PORT || "3000"

//Get the correct environmnent variables
if (process.env.NODE_ENV == "development"){
  require('dotenv').config({ path: "../env/dev.env" }) 
} else {
  require('dotenv').config({ path: "./environment/prod.env" })
}

const port = process.env.PORT || "7000"
const dbConfig = require(process.env.DATABASE_CONFIG_LOCATION || "../../database_config.json")

let databaseString;
if (process.env.DOCKER) databaseString = `${dbConfig.baseUrl}${dbConfig.catalogServiceDatabase}`
else databaseString = `${dbConfig.localhostUrl}${dbConfig.catalogServiceDatabase}`

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

// Routes usage
app.use('/api', router)

app.use(bodyParser.json()) //Parse request body to JSON
if (process.env.NODE_ENV == "development") app.use(morgan("dev")) //dont show all logs when in production mode
app.use(cors('*'))

//Catch all non existing endpoints
app.use("*", function (req, res, next) {
  next(new ErrorMessage("EndpointNotFoundError", "Endpoint not found", 404))
})

//Error middleware
app.use((err, req, res, next) => {
  res.status(err.status || 404).json(err).send();
})

//Setup server on designated port
app.listen(port, () => console.log(`Server is running on port: ${port}`))