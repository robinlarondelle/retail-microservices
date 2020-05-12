module.exports = class QueryProductModel {
  //This constructor doesn't validate anything because it only reads data from the database 
  constructor(id, name, description, price) {
    this.id = id
    this.name = name
    this.description = description
    this.price = price
  }

  //This is not included in the constructor as not every product neccessarily has a Third Party Vendor
  setTpv(tpv) {
    this.tpv = tpv
  }
}