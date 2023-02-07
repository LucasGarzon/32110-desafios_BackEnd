import axios from 'axios'

// URL para test
const URL = 'http://localhost:8080/products'

// Producto de ejemplo
const newProduct = {
  title: 'Ejemplo Axios 01',
  price: '200',
  thumbnail: 'https://cdn-icons-png.flaticon.com/512/342/342681.png'
}


let productId = ''

// Method GET de productos
async function getAllProducts() {
  try {
    const start = Date.now()
    const getRes = await axios.get(URL)
    const end = Date.now()
    const response = {
      Title: 'Get all products',
      URL,
      Method: 'GET',
      Status: getRes.status,
      Time: end - start + 'ms',
      Data: getRes.data
    }
    console.log(response)
  } catch (err) {
    console.log(err.message)
  }
}

// Method POST de productos
async function postProduct(product) {
  try {
    if (!product) return console.log("Debe ingresar un producto como parametro")
    const start = Date.now()
    const postRes = await axios.post(URL, product)
    const end = Date.now()
    const response = {
      Title: 'Create a product',
      URL,
      Method: 'POST',
      Status: postRes.status,
      Time: end - start + 'ms',
      Data: postRes.data
    }
    productId = postRes.data._id
    console.log(response)
  } catch (err) {
    console.log(err.message)
  }
}

//Method PUT para update de un producto
async function updateProduct(id, modification) {
  try {
    if (!id || !modification) return console.log('Se deben ingresar todos los parámetros para ejecutar la función')
    const newURL = URL + '/' + id
    const start = Date.now()
    const updateRes = await axios.put(newURL, modification)
    const end = Date.now()
    const response = {
      Title: 'Update a product',
      newURL,
      Method: 'POST',
      Status: updateRes.status,
      Time: end - start + 'ms',
      Data: updateRes.data
    }
    console.log(response)
  } catch (err) {
    console.log(err.message);
  }
}

// Method DELETE de un producto
async function delProduct(id) {
  try {
    if (!id) return console.log("Debe ingresar un id como parámetro para ejecutar la función")
    const newURL = URL + '/' + id
    const start = Date.now()
    const resDel = await axios.delete(newURL)
    const end = Date.now()
    if (resDel.data.deletedCount === 1) {
      const getRes = await axios.get(URL)
      const response = {
        Title: 'Delete a product',
        newURL,
        Method: 'DELETE',
        Status: resDel.status,
        Time: end - start + 'ms',
        Data: resDel.data,
        Products: getRes.data 
      }
      console.log(response)
    } else {
      const response = {
        Title: 'Delete a product',
        URL,
        Method: 'DELETE',
        Status: resDel.status,
        Time: end - start + 'ms',
        Data: resDel.data
      }
      console.log(response)
    }
  } catch (err) {
    console.log(err.message)
  }
}

getAllProducts()
await postProduct(newProduct)
await updateProduct(productId, {title: 'Ejemplo Axios 01 Actualizado'}) 
await delProduct(productId)