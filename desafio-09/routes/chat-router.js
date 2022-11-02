import {Router} from 'express';
import knex from 'knex';
import options from '../options/sqlite.config.js'
import Manager from '../chatManager.js'


const router = Router()
const database = knex(options)
const manager = new Manager()

router.get('/', (req, res) => {
    manager.findAll()
        .then(result => res.send(result))
        .catch(err => console.log(err))
        .finally(() => database.destroy())
})

router.post('/', (req, res) => {
    if (!req.body.email || !req.body.message) return res.send({error: 'data is required'})
    manager.create(req.body)
        .then(result => res.send(result))
        .catch(err => console.log(err))
        .finally(() => database.destroy())
})

const chatRouter = router
export {chatRouter}
