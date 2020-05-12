module.exports = class QueryTpvModel {
    //This constructor doesn't validate anything because it only reads data from the database 
    constructor(id, name) {
    this.id = id
    this.name = name
    }
}