const conn = require('../databasehandler');

module.exports = {
    consumeMsg(message) {
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
                    if (error) console.log("Something went wrong while trying to insert tpv into the DB: " + JSON.stringify(error))
                    // Else acknowledge message
                })
                break;
            case 'catalog.tpv.deleted':
                //TODO remove third party vendor from the database
                break;
        }
    },
}
