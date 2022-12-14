const fs = require('fs')

const pathToFile = '../desafio-02/productos.txt'

const readFile = async (file) => {
  let data = await fs.promises.readFile(file, 'utf-8')
  let products = JSON.parse(data)
  return products
}

class Manager {
  // save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
  save = async (newProduct) => {
    if (!newProduct.title || !newProduct.price || !newProduct.thumbnail) return {status: 'error', message: 'missing fields'} 
    try {
      if (fs.existsSync(pathToFile)) {
        let products = await readFile(pathToFile)
        let id = products[products.length-1].id + 1
        newProduct.id = id
        products.push(newProduct)
        await fs.promises.writeFile(pathToFile, JSON.stringify(products, null, 2))
        return {status: 'success', message: 'new product created', id: newProduct.id}
      } else {
        newProduct.id = 1
        await fs.promises.writeFile(pathToFile, JSON.stringify([newProduct], null, 2))
        return {status: 'success', message: 'new product created', id: newProduct.id}
      }
    } catch(err) {
      return {status: 'error', message: err.message}
    }
  }

  // getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
  getById = async (id) => {
    if (!id) return {status: 'error', message: null}
    if (fs.existsSync(pathToFile)) {
      let products = await readFile(pathToFile)
      let findProduct = products.find(findProduct => findProduct.id === id)
      if (findProduct) return {status: "success", message: findProduct}
      return {status: 'error', message: 'product not found'}
    } else {
      return {status: 'error', message: 'product not found'}
    }
  }

  // getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.
  getAll = async () => {
    if (fs.existsSync(pathToFile)){
      return {status: 'success', message: await readFile(pathToFile)}
    } else {
      return {status: 'error', message: 'object not found'}
    }
  }

  // deleteById(Number): void - Elimina del archivo el objeto con el id buscado.
  deleteById = async (id) => {
    if (!id) return {status: 'error', message: 'missing id'}
    if (fs.existsSync(pathToFile)) {
      let products = await readFile(pathToFile)
      let newProductsList = products.filter(newProductsList => newProductsList.id !== id)
      await fs.promises.writeFile(pathToFile, JSON.stringify(newProductsList, null, 2))
      return {status: 'success', message: 'product deleted'}
    } else {
      return {status: 'error', message: 'product not found'}
    }
  }

  // deleteAll(): void - Elimina todos los objetos presentes en el archivo.
  deleteAll = async () => {
    if (fs.existsSync(pathToFile)) {
      await fs.promises.unlink(pathToFile)
      return {status: 'success', message: 'products deleted'}
    } else {
      return {status: 'error', message: 'something gone wrong'}
    }
  }
  
}

module.exports = Manager