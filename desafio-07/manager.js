const options = require('./options/mysql.config.js')
const knex = require('knex')

const database = knex(options)

class Manager {
  create = async (product) => {
    let existTable = await database.schema.hasTable('productos')
    if (existTable) {
      await database('productos').insert(product)
      let data = await database.from('productos').select('*')
      let products = JSON.parse(JSON.stringify(data))
      await database.destroy()
      console.log(products);
      return products
    } else {
      await database.schema.createTable('productos', table => {
        table.increments('id')
        table.string('title', 15).nullable(false)
        table.float('price').nullable(false)
        table.string('thumbnail', 128).nullable(false)
      })  
      await database('productos').insert(product)
      let data = await database.from('productos').select('*')
      let products = JSON.parse(JSON.stringify(data))
      await database.destroy()
      return products 
    }
  }

  findAll = async () => {
    let existTable = await database.schema.hasTable('productos')
    if (!existTable) return "No se encontraron productos"
    let data = await database.from('productos').select('*')
    let products = JSON.parse(JSON.stringify(data))
    await database.destroy()
    return products
  }
}


// const createTable = async () => {
//   let existTable = await database.schema.hasTable('productos')
//   if (!existTable) {
//     await database.schema.createTable('productos', table => {
//       table.increments('id')
//       table.string('title', 15).nullable(false)
//       table.float('price').nullable(false)
//       table.string('thumbnail', 128).nullable(false)
//     })   
//     .then(() => console.log('Table created!'))
//     .catch(err => console.log(err))
//     database.destroy()
//   }
//   await database('productos').insert(productos)
//   let results = JSON.parse(JSON.stringify(await database.from('productos').select('*'))) 
//   console.log(results)
// }


module.exports = Manager