const routes = require('express').Router();
const transportController = require("./transporter.controller.js")

routes.get("/", transportController.getAll)
routes.get("/:id", transportController.getById)
routes.post("/", transportController.create)
routes.delete("/:id", transportController.delete)

module.exports = routes