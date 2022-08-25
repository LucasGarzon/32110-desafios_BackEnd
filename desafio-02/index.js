const Manager = require('./manager.js')
const manager = new Manager()

let newProduct = {
  title: "Flauta Nativa doble en Bambú",
  price: 28000,
  thumbnail: "https://d22fxaf9t8d39k.cloudfront.net/523a8da1dfc0a6cc1c16ebeb26e1a476c2d5cd70e4c95fe183f739b1856a9772102017.jpeg"
}

// DESCOMENTAR PARA PROBAR : 

// manager.save(newProduct).then(res => console.log(res))
// manager.getById(1).then(res => console.log(res))
// manager.getAll().then(res => console.log(res))
// manager.deleteById(1).then(res => console.log(res))
// manager.deleteAll().then(res => console.log(res))