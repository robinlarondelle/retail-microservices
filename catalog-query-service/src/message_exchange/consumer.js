module.exports = {
    consumeMsg(message) {
        let key = message.fields.routingKey
        let content = JSON.parse(message.content.toString())
        switch(key) {
            case 'catalog.product.created':
                //TODO add product to the database
                break;
            case 'catalog.product.deleted':
                //TODO set product to inactive
                break;
            case 'catalog.tpv.created':
                //TODO add third party vendor to the database
                break;
            case 'catalog.tpv.deleted':
                //TODO remove third party vendor from the database
                break;
        }
    },
}
