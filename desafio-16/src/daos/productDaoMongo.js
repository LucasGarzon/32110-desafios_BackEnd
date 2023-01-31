import { productSchema } from "../models/productModel.js"

export default class productDaoMongo {

  create = async (product) => {
    try {
      await productSchema.create(product)
      const products = await productSchema.find()
      return products
    } catch (err) {
      console.log(err);
    }
  }

  getAll = async () => {
    const products = await productSchema.find()
    return products
  }

}