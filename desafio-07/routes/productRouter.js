const express = require('express')
const router = express.Router()
const options = require('../options/mysql.config.js')
const knex = require('knex')

const database = knex(options)

const Manager = require('../manager.js')
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

module.exports = router