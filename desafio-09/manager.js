import options from './options/mysql.config.js'
import knex from 'knex'

const database = knex(options)

export default class Manager {
  create = async (product) => {
    let existTable = await database.schema.hasTable('productos')
    if (existTable) {
      await database('productos').insert(product)
      let data = await database.from('productos').select('*')
      let products = JSON.parse(JSON.stringify(data))
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
      return products 
    }
  }

  findAll = async () => {
    let existTable = await database.schema.hasTable('productos')
    if (!existTable) return "No se encontraron productos"
    let data = await database.from('productos').select('*')
    let products = JSON.parse(JSON.stringify(data))
    return products
  }
}
