const express = require('express')
const morgan = require("morgan") //HTTP request logger
const bodyParser = require('body-parser') //Pase request body to JSON
const cors = require("cors") // Access control

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