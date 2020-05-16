const conn = require('../databaseHandler');

module.exports = {
    consumeMsg(message, acknowledge) {
        let key = message.fields.routingKey
        let content = JSON.parse(message.content.toString())
        switch(key) {
            case 'catalog.product.created':
                break;
            case 'catalog.product.deleted':
                //TODO set product to inactive
                break;
            case 'catalog.tpv.created':
                conn.query('INSERT INTO tpv (_id, NAME) VALUES(?, ?);', [content._id, content.name], function(error, results, fields) {
                    if (error) console.log("Something went wrong while trying to insert tpv into the DB: " + error)
                    else acknowledge(message)
                })
                break;
            case 'catalog.tpv.deleted':
                conn.query('DELETE FROM tpv WHERE _id = (?);', [content._id], function(error, results, fields) {
                    if (error) console.log("Something went wrong while trying to remove tpv from the DB: " + error)
                    else acknowledge(message)
                })
                break;
        }
    },
}
