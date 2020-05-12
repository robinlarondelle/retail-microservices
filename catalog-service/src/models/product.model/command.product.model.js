import assert from 'assert';

export default class CommandProductModel {
  //All fields are validated because this model interacts with end users
  constructor(id) {
    assert(id != null, "Product ID should not be null")
    assert(typeof id == Number, "Product ID should be of type number")
    assert(id > 0, "Product ID must be more than zero")
    assert(Number.isInteger(id), "Product ID should be an integer")
    this.id = id
  }

  //All fields are validated because this model interacts with end users
  setName(name) {
    assert(name != null, "Name should not be null")
    assert(typeof name == String, "Name should be of type string")
    assert(name.length() > 0, "Product name should not be empty")
    this.name = name
  }

  //All fields are validated because this model interacts with end users
  setDescription(description) {
    assert(description != null, "Description should not be null")
    assert(typeof description == String, "Description should be of type string")
    assert(description.length() > 0, "Description name should not be empty")
    this.description = description
  }

  //All fields are validated because this model interacts with end users
  setPrice(price) {
    assert(price != null, "Price should not be null")
    assert(typeof price == Number, "Price should be of type number")
    assert(price > 0, "Price must be more than zero")
    this.price = price
  }

  //All fields are validated because this model interacts with end users
  setTpv(tpv) {
    assert(tpv != null, "Third party vendor ID should not be null")
    assert(typeof price == Number, "Third party vendor ID should be of type number")
    assert(price > 0, "Third party vendor ID must be more than zero")
    assert(Number.isInteger(number), "Third party vendor ID should be an integer")
    this.tpv = tpv
  }
}