const Manager = require('./manager.js')
const manager = new Manager()

let newProduct = {
  title: "Flauta Nativa Simple A",
  price: 28000,
  thumbnail: "https://d22fxaf9t8d39k.cloudfront.net/85815cb0ea960c169f82528ef1b5c04561333e84623c4e0f54cf0ac641dfc7b9102017.jpeg"
}

// manager.save(newProduct).then(res => console.log(res))
// manager.getById(1).then(res => console.log(res))
// manager.getAll().then(res => console.log(res))
// manager.deleteById(2).then(res => console.log(res))
// manager.deleteAll().then(res => console.log(res))