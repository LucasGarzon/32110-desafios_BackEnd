import PersistenceFactory from "../daos/persistenceFactory.js";

export default class ProductsService { 
  constructor() {
    this.productsDao
    this.init()
  }

  init = async() => {
    let persistence = await PersistenceFactory.getPersistence()
    this.productsDao = persistence.products
  }

  getProducts = async() => {
    return await this.productsDao.getAll()
  }
  
  addProduct = async(product) => {
    const { title, price, thumbnail } = product
    if (!title || !price || !thumbnail) return null
    return await this.productsDao.create(product)
  }

}