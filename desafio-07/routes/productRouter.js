const express = require('express')
const router = express.Router()

const Manager = require('../manager.js')
const manager = new Manager

router.get('/', (req, res) => {
    manager.findAll()
     .then(result => res.send(result))
     .catch(err => console.log(err))

})

router.post('/', (req, res) => {
  if (!req.body.title || !req.body.price || !req.body.thumbnail) return res.send({error: 'data is required'})
  console.log(req.body);
  manager.create(req.body)
    .then(result => res.send(result))
    .catch(err => console.log(err))
})

module.exports = router