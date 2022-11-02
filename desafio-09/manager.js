import { productSchema } from "./models/productModel.js"

export default class Manager {
  create = async (product) => {
    await productSchema.create(product)
    const products = await productSchema.find()
    return products
  }

  findAll = async () => {
    const products = await productSchema.find()
    return products
  }
}
