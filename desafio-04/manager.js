let products = require('./products.js')

class Manager {
  create = (product) => {
    let id = products[products.length-1].id+1
    product = {
      id, 
      "title" : product.title,
      "price" : parseInt(product.price),
      "thumbnail" : product.thumbnail
    }
    products.push(product)
    return product
  }

  findAll = () => {
    return products
  }

  findById = (id) => {
    id = parseInt(id)
    return products.find(item => item.id === id)
  }

  update = (id, product) => {
    id = parseInt(id)
    let newProducts = products.map(item => {
      if (item.id === id) {
        return {
          id, 
          ...product
        }
      } else return item
    })
    products = newProducts
    return this.findById(id)
  }

  delete = (id) => {
    id = parseInt(id)
    let newProducts = products.filter(item => item.id !== id)
    products = newProducts
    return products
  }

}

module.exports = Manager