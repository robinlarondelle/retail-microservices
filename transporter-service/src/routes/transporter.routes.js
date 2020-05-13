let express = require('express')
const routes = express.Router()
const transportController = require("../controllers/transporter.controller")

routes.get("/transporter/", transportController.getAll)
routes.get("/transporter/:id", transportController.getById)
routes.post("/transporter/", transportController.create)
routes.delete("/transporter/:id", transportController.delete)

module.exports = routes