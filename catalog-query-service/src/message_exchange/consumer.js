const conn = require('../databasehandler');

module.exports = {
    consumeMsg(message, acknowledge) {
        let key = message.fields.routingKey
        let content = JSON.parse(message.content.toString())
        switch(key) {
            case 'catalog.product.created':
                conn.query('INSERT INTO product (`_id`, `NAME`, `description`, `price`, `tpv`) VALUES(?, ?, ?, ?, (SELECT `name` FROM `tpv` WHERE `_id` = ?));', 
                [content._id, content.name, content.description, content.price, content.tpv], function(error, results, fields) {
                    if (error) console.log("Something went wrong while trying to insert product into the DB: " + error)
                    else acknowledge(message)
                })
                break;
            case 'catalog.product.deleted':
                conn.query('UPDATE `product` SET active = false WHERE _id = ?;',
                [content._id], function(error, results, fields) {
                    if (error) console.log("Something went wrong while updating a product in the DB: " + error)
                    else acknowledge(message)
                })
                break;
            case 'catalog.tpv.created':
                conn.query('INSERT INTO tpv (_id, NAME) VALUES(?, ?);', 
                [content._id, content.name], function(error, results, fields) {
                    if (error) console.log("Something went wrong while trying to insert tpv into the DB: " + error)
                    else acknowledge(message)
                })
                break;
            case 'catalog.tpv.deleted':
                conn.query('DELETE FROM tpv WHERE _id = (?);', 
                [content._id], function(error, results, fields) {
                    if (error) console.log("Something went wrong while trying to remove tpv from the DB: " + error)
                    else acknowledge(message)
                })
                break;
        }
    },
}
