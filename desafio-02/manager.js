// Implementar programa que contenga una clase llamada Contenedor que reciba el nombre del archivo con el que va a trabajar e implemente los siguientes métodos

// save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
// getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
// getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.
// deleteById(Number): void - Elimina del archivo el objeto con el id buscado.
// deleteAll(): void - Elimina todos los objetos presentes en el archivo.

/*
  Schema
  object = {
    title: (string)
    price: (number)
    thumbnail: (string)
  }
*/
const fs = require('fs')
const path = require('path')

const pathToFile = './productos.txt'

class Manager {
  // save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
  save = async (newProduct) => {
    if (!newProduct.title || !newProduct.price || !newProduct.thumbnail) return {status: 'error', message: 'missing fields'} 
    try {
      if (fs.existsSync(pathToFile)) {
        let data = await fs.promises.readFile(pathToFile, 'utf-8')
        let products = JSON.parse(data)
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
      let data = await fs.promises.readFile(pathToFile, 'utf-8')
      let products = JSON.parse(data)
      let findUser = products.find(findUser => findUser.id === id)
      if (findUser) return {status: "success", message: findUser}
      return {status: 'error', message: 'product not found'}
    } else {
      return {status: 'error', message: 'product not found'}
    }
  }

  // getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.
  getAll = async () => {
    if (fs.existsSync(pathToFile)){
      let data = await fs.promises.readFile(pathToFile, 'utf-8')
      let products = JSON.parse(data)
      return {status: 'success', message: products}
    } else {
      return {status: 'error', message: 'object not found'}
    }
  }

  // deleteById(Number): void - Elimina del archivo el objeto con el id buscado.

}




module.exports = Manager