const express = require('express')
const router = express.Router()

const options = require('../options/sqlite.config.js')
const knex = require('knex')

const database = knex(options)

const Manager = require('../chatManager.js')
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

module.exports = router