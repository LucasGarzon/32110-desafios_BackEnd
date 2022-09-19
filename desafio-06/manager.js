let products = require('./products.js')

class Manager {
  create = (product) => {
    let id 
    if (products.length === 0) id = 1
    else id = products[products.length-1].id+1
    product.price = parseFloat(product.price)
    product = {
      id, 
      ...product
    }
    products.push(product)
    return product
  }

  findAll = () => {
    return products
  }

}

module.exports = Manager