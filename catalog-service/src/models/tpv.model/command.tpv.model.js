import assert from 'assert';

export default class CommandQueryModel {
  //All fields are validated because this model interacts with end users
  constructor(id) {
    assert(id != null, "Third Party Vendor ID should not be null")
    assert(typeof id == Number, "Third Party Vendor ID should be of type number")
    assert(id > 0, "Third Party Vendor ID must be more than zero")
    assert(Number.isInteger(id), "Third Party Vendor ID should be an integer")
    this.id = id
  }

  //All fields are validated because this model interacts with end users
  setName(name) {
    assert(name != null, "Name should not be null")
    assert(typeof name == String, "Name should be of type string")
    assert(name.length() > 0, "Product name should not be empty")
    this.name = name
  }
}