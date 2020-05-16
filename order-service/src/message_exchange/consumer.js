const mongoose = require("mongoose")
const Order = require("../models/order.schema");
const Product = require("../models/product.schema");
const Transporter = require("../models/transporter.schema");
module.exports = {
    consumeMsg(message, acknowledge) {
        console.log(JSON.stringify(message.content.toString()))
        let key = message.fields.routingKey
        let content = JSON.parse(message.content.toString())
        switch(key) {
            case 'catalog.product.created':
                const product = new Product({
                    _id: content._id,
                    name: content.name
                })
                console.log("hoer")
                product.save()
                acknowledge(message)
                break;
            case 'catalog.product.deleted':
        
        
                break;
        }
    },
}
