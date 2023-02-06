import ProductsService from "../services/productService.js";
const productService = new ProductsService()

const saveProduct = async (req, res) => {
  const result = await productService.addProduct(req.body)
  res.send(result)
}

const getAllProducts = async (req, res) => {
  let result = await productService.getProducts()
  res.send(result)
}

const deleteProduct = async (req, res) => {
  let result = await productService.deleteProducts(req.params)
  if(!result) return res.send({message: 'Product not found'})
  res.send(result)
}

const getProductsForSocket = async (socket) => {
  let result = await productService.getProducts()
  socket.emit('history', result)
}

export default {
  saveProduct, getAllProducts, getProductsForSocket, deleteProduct
}