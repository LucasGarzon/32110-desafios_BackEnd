import __dirname from "../utils.js";
import fs from 'fs'


export default class ProductDaoFile {

  constructor() {
    this.path = __dirname + '/files/products.json'
    this.#init()
  }

  #init = async () => {
    if (!fs.existsSync(this.path)) await fs.promises.writeFile(this.path, JSON.stringify([]))
  }

  #readFile = async () => {
    let data = await fs.promises.readFile(this.path, 'utf-8')
    return JSON.parse(data)
  }

  create = async (product) => {
    try {
      let products = await this.#readFile()
      if (products.length === 0) product._id = 1
      else product._id = products[products.length-1]._id + 1
      products.push(product)
      await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2))
      return products
    } catch (err) {
      console.log(err)
    }
  }

  getAll = async () => {
    const products = await this.#readFile()
    return products
  }

}

