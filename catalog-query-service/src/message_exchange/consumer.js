const conn = require('../handlers/database.handler');

module.exports = {
    consumeMsg(message, acknowledge) {
        let key = message.fields.routingKey
        let content = JSON.parse(message.content.toString())
        
        //Only switch if there is a body with the event (content)
        if (content != null){
        switch(key) {
            //Add a product
            case 'catalog.product.created':
                conn.query('INSERT INTO product (`_id`, `NAME`, `description`, `price`, `tpv`) VALUES(?, ?, ?, ?, (SELECT `name` FROM `tpv` WHERE `_id` = ?));', 
                [content._id, content.name, content.description, content.price, content.tpv], function(error, results, fields) {
                    if (error) console.log("Something went wrong while trying to insert product into the DB: " + error)
                    else acknowledge(message)
                })
                break;

            //Set product active to "false"
            case 'catalog.product.deleted':
                conn.query('UPDATE `product` SET active = false WHERE _id = ?;',
                [content._id], function(error, results, fields) {
                    if (error) console.log("Something went wrong while updating a product in the DB: " + error)
                    else acknowledge(message)
                })
                break;
                
            //Add a third party vendor"
            case 'catalog.tpv.created':
                conn.query('INSERT INTO tpv (_id, NAME) VALUES(?, ?);', 
                [content._id, content.name], function(error, results, fields) {
                    if (error) console.log("Something went wrong while trying to insert tpv into the DB: " + error)
                    else acknowledge(message)
                })
                break;
            
            //Remove a third party vendor"
            case 'catalog.tpv.deleted':
                conn.query('DELETE FROM tpv WHERE _id = (?);', 
                [content._id], function(error, results, fields) {
                    if (error) console.log("Something went wrong while trying to remove tpv from the DB: " + error)
                    else acknowledge(message)
                })
                break;
            }
        }
        //If the event does not have a body, ignore it and remove from the stack
        else acknowledge(message)
    },
}
