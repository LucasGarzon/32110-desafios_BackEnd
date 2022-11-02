import {Router} from 'express';
import knex from 'knex';
import options from '../options/mysql.config.js'
import Manager from '../manager.js'


const router = Router()
const database = knex(options)
const manager = new Manager

router.get('/', (req, res) => {
    manager.findAll()
     .then(result => res.send(result))
     .catch(err => console.log(err))
     .finally(() => database.destroy())
})

router.post('/', (req, res) => {
  if (!req.body.title || !req.body.price || !req.body.thumbnail) return res.send({error: 'data is required'})
  manager.create(req.body)
    .then(result => res.send(result))
    .catch(err => console.log(err))
    .finally(() => database.destroy())
})

const productRouter = router
export {productRouter}