// import { productSchema } from "../models/productModel.js"

// export default class Manager {
//   create = async (product) => {
//     await productSchema.create(product)
//     const products = await productSchema.find()
//     return products
//   }

//   findAll = async () => {
//     const products = await productSchema.find()
//     return products
//   }
// }

import ProductsService from "../services/productService.js";
const productService = new ProductsService()

const saveProduct = async (req, res) => {
  const result = await productService.addProduct(req.body)
  res.send(result)
}

const getProducts = async (req, res) => {
  let result = await productService.getProducts()
  res.send(result)
}

const getProductsForSocket = async (socket) => {
  let result = await productService.getProducts()
  socket.emit('history', result)
  }

export default {
  saveProduct, getProducts, getProductsForSocket
}