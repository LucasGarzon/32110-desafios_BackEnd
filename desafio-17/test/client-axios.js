import axios from 'axios'

// URL para test
const URL = 'http://localhost:8080/products'

// Producto de ejemplo
const newProduct = {
  title: 'Ejemplo Axios 01',
  price: '200',
  thumbnail: 'https://cdn-icons-png.flaticon.com/512/342/342681.png'
}

// Method GET de productos
async function getAllProducts() {
  try {
    const getRes = await axios.get(URL)
    const response = {
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
  if (!product) return console.log("Debe ingresar un producto como parametro")
  const postRes = await axios.post(URL, product)
  const response = {
    URL,
    Method: 'POST',
    Status: postRes.status,
    Data: postRes.data
  }
  console.log(response)
}

// Method DELETE de un producto
async function delProduct(id) {
  if (!id) return console.log("Debe ingresar un id como parámetro para ejecutar la función")
  const newURL = URL + '/' + id
  const resDel = await axios.delete(newURL)
  const getRes = await axios.get(URL)
  const response = {
    URL,
    Method: 'DELETE',
    Status: resDel.status,
    Data: resDel.data,
    Products: getRes.data 
  }
  console.log(response)
}


// postProduct(newProduct)
// delProduct('63e14ed8b874aaf30902fe82')
// getAllProducts()