const routes = require('express').Router();
const supportController = require("../controllers/support.controller")

routes.get("/", supportController.getAllSupportTickets)
routes.get("/:id", supportController.getSupportTicketById)
routes.post("/", supportController.createSupportTicket)
routes.put("/:id", supportController.updateSupportTicketById)
routes.delete("/:id", supportController.deleteSupportTicketById)

module.exports = routes