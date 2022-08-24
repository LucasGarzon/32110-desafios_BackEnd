const Manager = require('./manager.js')
const manager = new Manager()

let newProduct = {
  title: "Flauta Nativa Simple en Bambú",
  price: 19000,
  thumbnail: "https://d22fxaf9t8d39k.cloudfront.net/165927622bf85daaf31c8c5758753903d8838ae4ed8f2eb856b8e3fcf0f26ba7102017.jpeg"
}

// manager.save(newProduct).then(res => console.log(res))
// manager.getById(1).then(res => console.log(res))
manager.getAll().then(res => console.log(res))
