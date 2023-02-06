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

  deleteProd = async (id) => {
    try {
      let deleteProduct = await productSchema.deleteOne({_id:id})
      return deleteProduct
    } catch (err) {
      console.log(err.message);
    }
  }

  updateProduct = async (id, modification) => {
    try {
      if (!modification) return ({error: 'error' ,message: 'Modification is required'})
      let product = await productSchema.updateOne({_id:id.id}, {$set: modification})
      if(product.acknowledged === false) return ({error: 'params error', message: 'Incorrect param'})
      let response = productSchema.findOne({_id:id.id})
      return response
    } catch (err) {
      console.log(err.message)
    }
  }

}