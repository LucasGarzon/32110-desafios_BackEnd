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
    const getRes = await axios.get(URL)
    const response = {
      Title: 'Get all products',
      URL,
      Method: 'GET',
      Status: getRes.status,
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
    const postRes = await axios.post(URL, product)
    const response = {
      Title: 'Create a product',
      URL,
      Method: 'POST',
      Status: postRes.status,
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
    const updateRes = await axios.put(newURL, modification)
    const response = {
      Title: 'Update a product',
      newURL,
      Method: 'POST',
      Status: updateRes.status,
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
    const resDel = await axios.delete(newURL)
    if (resDel.data.deletedCount === 1) {
      const getRes = await axios.get(URL)
      const response = {
        Title: 'Delete a product',
        newURL,
        Method: 'DELETE',
        Status: resDel.status,
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