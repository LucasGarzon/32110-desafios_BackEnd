const Manager = require('../desafio-02/manager.js')
const manager = new Manager()

const express = require('express')
const app = express()

const server = app.listen(8080, () => console.log('Server up!'))
server.on('error', err => console.log(`Error en el servidor ${err}`))

// 1 -- A
app.get('/productos', (request, response) => {
  manager.getAll().then(res => response.send(res.message))
  manager.getAll().then(res => console.log(res))
})

// 1 -- B
app.get('/productoRandom', (request, response) => {
  manager.getAll().then(res => {
    let products = res.message
    let random = Math.floor(Math.random() * products.length + 1)
    manager.getById(random).then(res => {response.send(res.message)})
  })
})