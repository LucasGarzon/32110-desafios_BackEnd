import axios from 'axios'


(async () => { 
  try {

    const newProduct = {
      title: 'Ejemplo Axios 01',
      price: 200,
      thumbnail: 'https://cdn-icons-png.flaticon.com/512/342/342681.png'
    }

    const responseArray = []

    const URL = 'http://localhost:8080/products'

    // Metodo GET de todoslos productos

    let getRes = await axios.get(URL)
    responseArray.push({
      URL,
      method: 'GET',
    }, getRes.data)

    // Crear producto

    // let postRes = await axios.post(URL, newProduct)
    // responseArray.push({
    //   url: '/products',
    //   method: 'POST',
    // }, postRes.data) 

    // Eliminar producto 


    // Enviar Respuesta
    console.log(responseArray);
    
  } catch (err) {
    console.log(err.message);
  }
})()