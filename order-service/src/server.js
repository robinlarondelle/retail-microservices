const express = require('express')
const morgan = require("morgan") //HTTP request logger
const bodyParser = require('body-parser') //Pase request body to JSON
const mongoose = require('mongoose'); // MongoDB
const cors = require("cors") // Access control

//Routes require
const orderRoutes = require('./routes/order.routes')

const app = express()
const port = process.env.PORT || "3000"

// MongoDB
// mongoose.Promise = global.Promise;
// if (process.env.NODE_ENV !== 'test') {
// 	mongoose.connect('{{Connection string here}}', { useNewUrlParser: true, useFindAndModify: false });
// }

//Get the correct environmnent variables
if (process.env.NODE_ENV == "development"){
  require('dotenv').config({ path: "../env/dev.env" }) 
} else {
  require('dotenv').config({ path: "./environment/prod.env" })
}

// Routes usage
app.use('/api', orderRoutes)

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