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
                // Insert third party vendor into the MySQL database
                conn.query('INSERT INTO tpv (_id, NAME) VALUES(?, ?);', [content._id, content.name], function(error, results, fields) {
                    if (error) console.log("Something went wrong while trying to insert tpv into the DB: " + error)
                    // Only if it has been saved correctly do we acknowledge the message and remove it from the queue
                    else acknowledge(message)
                })
                break;
            case 'catalog.tpv.deleted':
                //TODO remove third party vendor from the database
                break;
        }
    },
}
